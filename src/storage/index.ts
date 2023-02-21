import Logger from '@logger'

import { StorageKeys } from './enums'
import * as Selectors from './selectors'
import * as Types from './types'
import * as Enums from './enums'
import * as utils from './utils'
import { StorageData } from './types'
import { processRawDis, validateRawClubSummary } from './utils'

const { logSuccess, logInfo } = Logger

class Storage {
  // eslint-disable-next-line no-use-before-define
  static Instance: Storage
  static Enums = Enums
  static Types = Types
  static Utils = utils
  static Selectors = Selectors
  private storage: StorageData = {
    dis: null,
    clubSummary: null,
  }

  constructor() {
    if (Storage.Instance) {
      return Storage.Instance
    }

    Storage.Instance = this as Storage
  }

  get(key: StorageKeys): StorageData[StorageKeys] | null {
    logInfo('Getting value from Storage, key: ', key)
    return this.storage[key] || null
  }

  set(key: keyof StorageData, value: string) {
    let validatedValue: StorageData[keyof StorageData] | null = null
    switch (key) {
      case 'dis': {
        const dis = processRawDis(value)
        if (!dis) {
          return
        }
        validatedValue = dis
        break
      }

      case 'clubSummary': {
        const clubSummary = validateRawClubSummary(value)
        if (!clubSummary) {
          return
        }
        validatedValue = clubSummary
        break
      }

      default:
        throw new Error('Invalid key!')
    }

    this.storage = { ...this.storage, [key]: validatedValue }
    /* Should be logged on .then() */
    const successMessage = `Updated ${key} with value ${value}!`
    logSuccess(successMessage)
  }
}

export default Storage
export * from './types'
