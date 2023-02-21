import { selectLoginButton, selectPlayersTile } from '@selectors'
import { validatePlayerDetails } from '@validate'
import Logger from '@logger'

import utils from '../../utils'
import Observer from '../../utils/observer'

import { PlayerDetails } from './types'

const { logInfo, logError } = Logger

class Club {
  clickPlayersTile = () => {
    const playersTile = selectPlayersTile()

    if (!playersTile) {
      logError('No "Players" tile found!')
      return
    }

    utils.simulateClick(playersTile)
  }
  private getPlayerDetails = (playerElement: HTMLElement): PlayerDetails => {
    const rating =
      playerElement.querySelector<HTMLElement>('div.rating')?.textContent
    const position =
      playerElement.querySelector<HTMLElement>('div.position')?.textContent
    const name =
      playerElement.querySelector<HTMLElement>('div.name')?.textContent
    const addButton = playerElement.querySelector<HTMLButtonElement>(
      'button.btnAction.add'
    )
    const parentListElement = playerElement.parentElement
    return { name, rating, position, addButton, parentListElement }
  }
  getPlayersFromClubSearch = () => {
    return [...document.querySelectorAll<HTMLUListElement>('li.listFUTItem')]
  }

  sendToTransferList = async () => {
    const playersFromClubSearch = this.getPlayersFromClubSearch()
    if (playersFromClubSearch.length === 0) {
      logInfo('No players found from club search! Bailing out!')
      return
    }

    const askIfRepeat = () => {
      if (confirm('Do you want to send the next player?')) {
        this.sendToTransferList()
      }
    }

    const firstPlayer = playersFromClubSearch[0]
    const playerDetails = this.getPlayerDetails(firstPlayer)
    validatePlayerDetails(playerDetails)

    const { name, rating, position, addButton, parentListElement } =
      playerDetails

    if (
      confirm(
        `Send player: ${name.toUpperCase()}, RATING ${rating}, ${position} to transfer list?`
      )
    ) {
      logInfo(
        `Sending player: ${name.toUpperCase()}, ${rating}, ${position} to transfer list!`
      )
      parentListElement.id = 'SendToTransferListPlayerItems'
      utils.simulateClick(addButton)
      new Observer().waitForListElementToBeRemoved(
        'SendToTransferListPlayerItems',
        async () => {
          await askIfRepeat()
        }
      )
    } else {
      await askIfRepeat()
    }
  }

  getActions() {
    return {
      clickPlayersTile: this.clickPlayersTile.bind(this),
      sendToTransferList: this.sendToTransferList.bind(this),
    }
  }
}

export default Club
export * from './types'
