import {
  selectCancelButton,
  selectPlayerItemsList,
  selectSendToMyClubButton,
  selectYesButton,
} from '@selectors'
import Logger from '@logger'

import utils from '../utils'

const { logError } = Logger

class Shared {
  static clickModalConfirmationButton = () => {
    const yesButton = selectYesButton()
    if (yesButton) {
      utils.simulateClick(yesButton)
    } else {
      logError('Dialog confirmation "Yes" button not found!')
    }
  }

  static clickModalCancelButton = () => {
    const noButton = selectCancelButton()
    if (noButton) {
      utils.simulateClick(noButton)
    } else {
      logError('Dialog "Cancel" button not found!')
    }
  }

  static clickSendToMyClubButton = () => {
    const sendToMyClubButton = selectSendToMyClubButton()
    if (!sendToMyClubButton) {
      logError('No send to my club button found!')
      return
    }
    utils.simulateClick(sendToMyClubButton)
  }

  static selectNextPlayerItem = () => {
    const { allPlayerItemsList, nextIndex } = selectPlayerItemsList()

    // Just figure out which player index is next on the list and run utils.simulateClick on it
    if (nextIndex !== null) {
      utils.simulateClick(allPlayerItemsList[nextIndex])
    }
  }
  static selectPreviousPlayerItem = () => {
    try {
      const { allPlayerItemsList, previousIndex } = selectPlayerItemsList()

      // Just figure out which player index is previous on the list and run utils.simulateClick on it
      if (previousIndex !== null) {
        utils.simulateClick(allPlayerItemsList[previousIndex])
      }
    } catch (err) {
      logError(
        `Could not select previous player! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
  }

  getActions = () => {
    return {
      clickSendToMyClubButton: Shared.clickSendToMyClubButton,
      clickDialogCancelButton: Shared.clickModalCancelButton,
      clickDialogConfirmationButton: Shared.clickModalConfirmationButton,
      nextPlayer: Shared.selectNextPlayerItem,
      previousPlayer: Shared.selectPreviousPlayerItem,
    }
  }
}

export default Shared
export * from './enums'
