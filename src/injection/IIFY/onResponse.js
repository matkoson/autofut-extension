/* eslint-disable */
// @ts-nocheck

const onResponse = `(${function() {
  // eslint-disable-next-line no-console
  console.info('onResponse loaded!')
  // define monkey patch function
  const monkeyPatch = () => {
    const oldXHROpen = window.XMLHttpRequest.prototype.open
    window.XMLHttpRequest.prototype.open = function() {
      let disconnected = false
      let pls = null
      let dis = null

      const cleanup = () => {
        this.removeEventListener('load')
        window.XMLHttpRequest.prototype.open = oldXHROpen
        console.info('Injection "onResponse" cleaned up!')
      }

      const extractBaseUrl = (url) => {
        const regex = /^(https?:\/\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/)/
        const match = url.match(regex)
        return match ? match[1] : null
      }

      const whitelist = {
        'https://utas.mob.v1.fut.ea.com/ut/auth': (rawDis) => {
            getInnocuous().setAttribute('dis', rawDis)
            dis = true
        },
        'items/web/players': (rawPls) => {
          const hasLegends = rawPls.includes('"LegendsPlayers"')
          const hasPlayers = rawPls.includes('"Players"')

          if (hasLegends && hasPlayers) {
            getInnocuous().setAttribute('pls', rawPls)
            pls = true
          }
        }
      }

      const saveUrl = (url) => {
        const urls = getInnocuous().getAttribute('recordedUrls')
        if (!urls) {
          getInnocuous().setAttribute('recordedUrls', JSON.stringify([url]))
        } else {
          let parsedRecordedUrls = JSON.parse(urls)
          if (!Array.isArray(parsedRecordedUrls)) {
            return
          }
          parsedRecordedUrls = [
            url,
            ...parsedRecordedUrls,
          ]
          getInnocuous().setAttribute('recordedUrls', JSON.stringify(parsedRecordedUrls))
        }
      }
      const getInnocuous = () => {
        const innocuous = document
          .getElementById('innocuous')
        if (!innocuous) {
          try {
            throw new Error('innocuous not found')
          } catch {
            console.error('innocuous not found')
          }
        }
        return innocuous
      }
      const onLoad = () => {
        if (!document.getElementById('innocuous')) {
          return
        }

        if (dis && pls) {
          cleanup()
          return
        }

        // const url = extractBaseUrl(this.responseURL)
        const url = this.responseURL
        if (!url) {
          return
        }
        Object.keys(whitelist).forEach((whitelistedUrl) => {
          if (url.includes(whitelistedUrl)) {
            whitelist[whitelistedUrl](this.responseText)
          }
        })


        // saveUrl(url)
        console.warn('Saving intercepted URLs is turned off!')
        // const commentOut = () => {
        //   const isBlacklisted = blackList.some((item) => {
        //     return url.includes(item)
        //   })
        //
        //   // if the URL is blacklisted, I'm not even interested in recording it, abort
        //   if (isBlacklisted) {
        //     return
        //   }
        //
        //   const recordedUrls = document
        //     .getElementById('innocuous')
        //     .getAttribute('recordedUrls')
        //
        //
        //   // if there's no recorded urls, set it, and return
        //   if (!recordedUrls) {
        //     console.info('no recorded urls, setting it')
        //     getInnocuous()
        //       .setAttribute('recordedUrls', JSON.stringify([url]))
        //
        //
        //     getInnocuous().setAttribute('body', this.responseText)
        //     getInnocuous().setAttribute('url', url)
        //     return
        //   }
        //
        //   let parsedRecordedUrls = JSON.parse(recordedUrls)
        //
        //   if (!Array.isArray(parsedRecordedUrls)) {
        //     return
        //   }
        //
        //   // if url already recorded, return
        //   if (parsedRecordedUrls.includes(url)) {
        //     return
        //   }
        //
        //
        //   /* So, to make an actual new record, I need to know that:
        //   * 1. the url is not null
        //   * 2. the url is not blacklisted
        //   * 3. the url is not already recorded
        //   */
        //
        //   /* Make a new record. */
        //   parsedRecordedUrls = [
        //     url,
        //     ...parsedRecordedUrls,
        //   ]
        //   getInnocuous().setAttribute('recordedUrls', JSON.stringify(parsedRecordedUrls))
        //
        //   getInnocuous().setAttribute('body', this.responseText)
        //   getInnocuous().setAttribute('url', url)
        // }      
      }

      this.addEventListener('load', function() {
        onLoad()
      })

      return oldXHROpen.apply(this, arguments)
    }
  }
  monkeyPatch()
}})();`

export default onResponse
