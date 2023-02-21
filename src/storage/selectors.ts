import Logger from '@logger'

import { StorageKeys } from './enums'
import { StorageData } from './types'

import Storage from './index'

const { logError } = Logger

export const selectDis = () => {
  const storage = new Storage()
  const dis = storage.get(StorageKeys.dis) as string | null
  if (!dis) {
    logError('"dis" is not set in storage!')
  }

  return dis
}
export const selectClubSummary = () => {
  const storage = new Storage()
  const clubSummary = storage.get(StorageKeys.clubSummary) as
    | StorageData[StorageKeys.clubSummary]
    | null
  if (!clubSummary) {
    logError('"clubSummary" is not set in storage!')
  }

  return clubSummary
}
