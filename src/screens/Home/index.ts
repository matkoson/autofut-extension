import { selectSyncClubButton } from '@selectors'
import Logger from '@logger'

const { logError } = Logger

class Home {
  clickTransferList = () => {
    return ''
  }

  clickSyncClubButton = () => {
    const syncClubButton = selectSyncClubButton()

    if (syncClubButton === null) {
      logError('Could not find generate club report button')
      return
    }

    syncClubButton.click()
  }

  getActions() {
    return {
      clickTransferList: this.clickTransferList.bind(this),
      clickSyncClubButton: this.clickSyncClubButton.bind(this),
    }
  }
}

export default Home
