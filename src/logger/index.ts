import settings from '@settings'

const isBrowser = typeof window !== 'undefined'
const isChrome = isBrowser && typeof chrome !== 'undefined'

class Logger {
  private static processMessages = function (messages: unknown[]) {
    return [...messages]
      .map((message) => {
        let processedMessage = ''
        if (typeof message === 'string') {
          processedMessage = message
        }

        if (typeof window !== 'undefined' && message instanceof NodeList) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore some issue with iterating over a NodeList, idc
          processedMessage = [...message]
            .map((element) => {
              return element?.toString() || JSON.stringify(message, null, 2)
            })
            .join(' ')
        }

        if (typeof message === 'object') {
          processedMessage = JSON.stringify(message, null, 2)
        }

        if (isChrome && processedMessage.length > 50) {
          chrome.storage.local.get(['AutoFutErrors'], (data) => {
            let errors = data.AutoFutErrors
            if (!errors) {
              errors = []
            }

            errors.push(message)
            chrome.storage.local.set({ AutoFutErrors: errors })
          })
          processedMessage = `${processedMessage.slice(0, 50)}...`
        }

        return processedMessage
      })
      .join(' ')
  }
  static logDebug = (...messages: unknown[]) => {
    if (settings.logLevel > 1) {
      console.log(
        `🔎 %cDEBUG: ${this.processMessages(messages)}`,
        'color: purple; font-size: 20px'
      )
    }
  }
  static logError = (...messages: unknown[]) => {
    console.log(
      `🛑 %cERROR: ${this.processMessages(messages)}`,
      'color: red; font-size: 20px'
    )
    messages.forEach((message) => {
      /* Check if message is Error, if so, log accordingly */
      if (message instanceof Error) {
        console.error(message)
      }
    })
  }
  static logInfo = (...messages: unknown[]) => {
    if (settings.logLevel > 0) {
      console.info(
        `ℹ️  %cINFO: ${this.processMessages(messages)}`,
        'color: blue; font-size: 20px'
      )
    }
  }

  static logSuccess = (...messages: unknown[]) => {
    console.log(
      `✅ %cSUCCESS: ${this.processMessages(messages)}`,
      'color: green; font-size: 20px'
    )
  }
  static logWarn = (...messages: unknown[]) => {
    console.warn(
      `⚠️  %cWARN: ${this.processMessages(messages)}`,
      'color: orange; font-size: 20px'
    )
  }
}

export default Logger
