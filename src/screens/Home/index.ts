import { selectGenerateClubReportButton } from '@selectors'
import Logger from '@logger'

const { logError } = Logger

class Home {
  clickTransferList = () => {
    return ''
  }

  syncClub = () => {
    const generateClubReport = selectGenerateClubReportButton()

    if (generateClubReport === null) {
      logError('Could not find generate club report button')
      return
    }

    generateClubReport.click()
  }

  getActions() {
    return {
      clickFavourites: this.clickTransferList.bind(this),
      clickGenerateClubReport: this.syncClub.bind(this),
    }
  }
}

export default Home
