import Logger from '../logger'

import { RawDis } from './types'

const { logError } = Logger
/* TODO:
 * 1. Figure out if regular and legends players id' can overlap.
 *    */
export const validatePls = (rawPls: string): string | null => {
  const hasLegends = rawPls.includes('"LegendsPlayers"')
  const hasPlayers = rawPls.includes('"Players"')

  if (hasLegends && hasPlayers) {
    return rawPls
  }
  return null
}

export const processRawDis = (rawDis: string): string | null => {
  let dis: RawDis | null = null

  try {
    dis = JSON.parse(rawDis)
    if (!dis) {
      throw new Error('Parsing "dis" failed! "dis" is null')
    }
  } catch (err) {
    logError('Error parsing "dis"', err)
    return null
  }

  const { sid } = dis

  return sid
}

export const validateRawClubSummary = (
  rawClubSummary: string
): string | null => {
  const hasExpectedStructure = rawClubSummary.includes('"itemData":')
  if (hasExpectedStructure) {
    return rawClubSummary
  }
  return null
}
