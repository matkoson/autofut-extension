import Api from '@api'
import Logger from '@logger'
import Storage from '@storage'

const BACKEND_BASE_URL = 'http://localhost:1939'

const { logDebug, logError, logInfo, logSuccess } = Logger
export const syncClub = async () => {
  try {
    const storage = new Storage()
    logDebug('generateClubReport triggered!')
    const dis = Storage.Selectors.selectDis()

    if (!dis) {
      throw new Error('Could not retrieve dis from Storage!')
    }

    const { response: resClubSummary, error } = await Api.fetchClubSummary(dis)

    if (!resClubSummary) {
      throw new Error('Could not fetch "Club Summary"!')
    }
    logInfo('Saving "Club Summary" to Storage!')

    storage.set(Storage.Enums.StorageKeys.clubSummary, resClubSummary)

    const rawClubSummary = Storage.Selectors.selectClubSummary()
    if (!rawClubSummary) {
      throw new Error('Could not retrieve "clubSummary" from Storage!')
    }
    logDebug('clubSummary:', JSON.stringify(rawClubSummary))

    const bodyParams: {
      rawClubSummary: string
      dis: string
    } = {
      rawClubSummary,
      dis,
    }

    await fetch(`${BACKEND_BASE_URL}/sync_club`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParams),
    })
  } catch (error) {
    logError('Generate Club Report failed!', (error as Error).message)
  }
}
