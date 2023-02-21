import Logger from '../logger'

import Ea from './ea'

const { logInfo, logError } = Logger

export const fetchClubSummary = async (
  browserToken: string
): Promise<{
  error: Error | null
  response: string | null
}> => {
  const requestOptions = new Ea({ browserToken }).makeRequestOptions()

  try {
    logInfo(
      "Making request to 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/club'"
    )
    const summary = await fetch(
      'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/club',
      requestOptions as RequestInit
    )
    const summaryString = await summary.text()
    return {
      response: summaryString,
      error: null,
    }
  } catch (err) {
    const error = err as Error
    logError("Couldn't get club summary", error)

    return {
      response: null,
      error,
    }
  }
}
