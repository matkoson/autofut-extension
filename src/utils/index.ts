import Logger from '@logger'

import Legacy from './legacy'

const { logInfo, logError } = Logger

const utils = {
  ...Legacy.getMethods(),
  waitFor: (callback: () => void, ms = 1000) => {
    logInfo(`Waiting for ${ms / 1000} seconds!`)
    return setTimeout(() => {
      callback()
    }, ms)
  },
  wait: (ms = 1000) => {
    logInfo(`Waiting for ${ms / 1000} seconds!`)
    return new Promise((resolve) => {
      return setTimeout(resolve, ms)
    })
  },
  focusInput: (inputElement: HTMLInputElement) => {
    inputElement.focus()
    inputElement.select()
  },
  waitForElement: <ExpectedReturnType extends Element>(
    selector: string
  ): Promise<NodeListOf<ExpectedReturnType>> => {
    return new Promise((resolve, reject) => {
      const start = Date.now()
      const intervalId = setInterval(() => {
        const element = document.querySelectorAll<ExpectedReturnType>(selector)
        if (element.length > 0) {
          resolve(element)
          clearInterval(intervalId)
        } else if (Date.now() - start > 5000) {
          reject(logError(`Element not found after ${Date.now() - start} ms!`))
          clearInterval(intervalId)
        }
      }, 1000)
    })
  },
  getListItemsInnerText: function (list: NodeListOf<HTMLUListElement>) {
    return [...list].map((listElement) => {
      return [...listElement.querySelectorAll<HTMLUListElement>('li')].map(
        (listItem) => {
          return listItem.textContent
        }
      )
    })
  },

  triggerDebugger: () => {
    try {
      throw new Error('debugger')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
}

export default utils
export * from './api'
