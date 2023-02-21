import { StorageKeys } from './enums'

export type RawPlayer = {
  f: string
  id: string
  l: string
  r: number
}

export type RawDis = {
  protocol: string
  ipPort: string
  serverTime: string
  lastOnlineTime: string
  sid: string
  phishingToken: string
}

export type StorageData = {
  [StorageKeys.dis]: string | null
  [StorageKeys.clubSummary]: string | null
}
