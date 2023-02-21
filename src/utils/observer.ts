import Logger from '@logger'

const { logInfo, logSuccess, logError, logDebug } = Logger

class Observer {
  constructor() {
    logInfo('Observer created!')
  }

  waitForFifaHeader = (callback: (fifaHeader: HTMLElement) => void) => {
    let isFifaHeaderAdded = false
    let fifaHeader: null | HTMLElement = null
    // Create a new MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if the top-level <div> has been added to the DOM
          const fifaHeaderMaybe = document.querySelector<HTMLElement>(
            '.ut-fifa-header-view'
          )
          if (fifaHeaderMaybe) {
            isFifaHeaderAdded = true
            fifaHeader = fifaHeaderMaybe
            observer.disconnect()
          }
        }
      })

      if (isFifaHeaderAdded) {
        callback(fifaHeader as HTMLElement)
      }
    })

    // Configure the observer to observe changes to the child elements of the <body> tag
    const config = { childList: true, subtree: true }
    observer.observe(document.body, config)
  }

  waitForDis = (
    observeTarget: HTMLElement,
    callback: (observer: MutationObserver, dis: string) => void
  ) => {
    const observer = new MutationObserver((mutations) => {
      let dis: string | null = null
      let mutationIndex = 0
      const mutationsCount = mutations.length

      while (!dis) {
        if (mutationIndex >= mutationsCount) {
          return
        }
        const mutation = mutations[mutationIndex]

        if (mutation?.target) {
          const mutationTarget = mutation.target as HTMLElement
          logDebug('Mutation target: ', mutationTarget)

          if (!dis) {
            const disValue = mutationTarget.getAttribute('dis')
            if (disValue !== null) {
              logSuccess('"dis" added! "dis": ', disValue)
              dis = disValue
            }
          }
        }
        mutationIndex += 1
      }

      callback(observer, dis as string)
    })

    observer.observe(observeTarget, {
      // configure it to listen to attribute changes
      attributes: true,
    })
  }

  waitForListElementToBeRemoved(listId: string, callback: () => void) {
    const observer = new MutationObserver((mutations) => {
      let removedNode = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.removedNodes.length > 0) {
            removedNode = true
          }
        }
      })
      logInfo('Disconnecting mutation observer!')
      observer.disconnect()
      callback()
    })

    const listElement = document.querySelector<HTMLElement>(`#${listId}`)
    if (!listElement) {
      logError('No list element found!')
      return
    }

    const config = { childList: true }
    observer.observe(listElement, config)
  }
}

export default Observer
