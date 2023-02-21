import Logger from '@logger'

const { logError } = Logger

export const selectClearSoldButton = () => {
  return [
    ...document.querySelectorAll<HTMLElement>('.section-header-btn'),
  ].filter((btn) => {
    return btn.textContent === 'Clear Sold'
  })[0]
}

export const selectReListAllButton = () => {
  return Array.from(
    document.querySelectorAll<HTMLElement>('.section-header-btn')
  ).filter((btn) => {
    return btn.textContent === 'Re-list All'
  })[0]
}

export const selectQuickSellButton = () => {
  const button = Array.from(
    document.querySelectorAll<HTMLElement>('div.ut-button-group > button')
  ).filter((btn) => {
    const buttonLabel = btn?.querySelector<HTMLElement>('span.btn-text')
    if (buttonLabel === null) {
      throw new Error(`Could not find button label for button: ${btn}`)
    }
    return buttonLabel.textContent === 'Quick Sell'
  })[0]
  return button
}

export const selectAddPlayerButton = () => {
  const button = Array.from(
    document.querySelectorAll('header.ut-section-header-view')
  )
    .filter((header) => {
      const headerButton = header.querySelector<HTMLElement>('button')
      if (headerButton === null) {
        throw new Error(`Could not find button for header: ${header}`)
      }

      return headerButton.textContent === 'Add Player'
    })[0]
    .querySelector('button')
  return button
}

export const selectClubSearchButton = () => {
  const button = Array.from(
    document.querySelectorAll<HTMLElement>(
      'div.button-container > button.btn-standard'
    )
  ).filter((btn) => {
    return btn.textContent === 'Search'
  })[0]

  return button
}

export const selectPlayerItemsList = (): {
  allPlayerItemsList: HTMLElement[]
  previousIndex: number
  nextIndex: number
  selectedIndex: number
} => {
  const playerItemsList = [
    ...document.querySelectorAll<HTMLElement>('li.listFUTItem'),
  ]

  if (!playerItemsList.length) {
    throw new Error('Could not find player items list')
  }
  const selectedIndex = playerItemsList.findIndex((item) => {
    return item.classList.contains('selected')
  })

  let previousIndex = null
  if (selectedIndex > 0) {
    previousIndex = selectedIndex - 1
  } else if (selectedIndex === 0) {
    previousIndex = playerItemsList.length - 1
  }

  let nextIndex = null
  if (selectedIndex < playerItemsList.length - 1) {
    nextIndex = selectedIndex + 1
  } else if (selectedIndex === playerItemsList.length - 1) {
    nextIndex = 0
  }

  if (selectedIndex === -1) {
    throw new Error('Could not find selected player item')
  }
  if (previousIndex === null) {
    throw new Error('Could not find previous player item')
  }
  if (nextIndex === null) {
    throw new Error('Could not find next player item')
  }

  return {
    allPlayerItemsList: playerItemsList,
    selectedIndex,
    previousIndex,
    nextIndex,
  }
}

export const selectListOnTransferMarketButton = () => {
  const button = [
    ...document.querySelectorAll<HTMLElement>(
      'div.DetailPanel > div.ut-quick-list-panel-view > div.ut-button-group > button.accordian'
    ),
  ].filter((btn) => {
    /* Item might've been already listed, and we want to re-list,
    which is the same action, just different button label. */
    return (
      btn.textContent === 'List on Transfer Market' ||
      btn.textContent === 'Re-list Item'
    )
  })[0]

  if (!button) {
    logError('No List on Transfer Market button found!')
    return null
  }
  return button
}
export const selectStartPriceInput = () => {
  const panelActionRows = [
    ...document.querySelectorAll<HTMLElement>("div[class='panelActionRow']"),
  ].filter((panelActionRow) => {
    const spinnerLabel = panelActionRow.querySelector<HTMLElement>(
      'div.buttonInfoLabel > span.spinnerLabel'
    )
    if (spinnerLabel) {
      return spinnerLabel.textContent === 'Start Price:'
    }

    return false
  })[0]

  if (!panelActionRows) {
    logError('No "Start Price" panelActionRow found!')
    return null
  }
  const input = panelActionRows.querySelector<HTMLInputElement>(
    'input.ut-number-input-control'
  )
  if (!input) {
    logError('No "Start Price" input found!')
    return null
  }
  return input
}
export const selectBuyNowPriceInput = () => {
  const panelActionRows = [
    ...document.querySelectorAll<HTMLElement>("div[class='panelActionRow']"),
  ].filter((panelActionRow) => {
    const spinnerLabel = panelActionRow.querySelector<HTMLElement>(
      'div.buttonInfoLabel > span.spinnerLabel'
    )
    if (spinnerLabel) {
      return spinnerLabel.textContent === 'Buy Now Price:'
    }

    return false
  })[0]

  if (!panelActionRows) {
    logError('No "Buy Now Price" panelActionRow found!')
    return null
  }
  const input = panelActionRows.querySelector<HTMLInputElement>(
    'input.ut-number-input-control'
  )

  if (!input) {
    logError('No "Buy Now Price" input found!')
    return null
  }
  return input
}
export const selectListForTransferButton = () => {
  const button = Array.from(document.querySelectorAll('div.panelActions'))
    .filter((panelActions) => {
      const listForTransferButton = panelActions.querySelector<HTMLElement>(
        'button.btn-standard.call-to-action'
      )
      if (listForTransferButton === null) {
        throw new Error('No "List for Transfer" button found!')
      }
      return listForTransferButton.textContent === 'List for Transfer'
    })[0]
    .querySelector<HTMLElement>('button.call-to-action')

  if (!button) {
    logError('No "List for Transfer" button found!')
    return null
  }
  return button
}

export const selectTransferMarketTile = () => {
  const transferMarketTile = document.querySelector<HTMLInputElement>(
    '.ut-tile-transfer-market'
  )
  return transferMarketTile
}

export const selectTransferListTile = () => {
  const transferListTile = document.querySelector<HTMLInputElement>(
    '.ut-tile-transfer-list'
  )
  if (!transferListTile) {
    logError('No transfer list tile found!')
    return null
  }
  return transferListTile
}

export const selectTransferTargetsTile = () => {
  const transferTargetsTile = document.querySelector<HTMLInputElement>(
    '.ut-tile-transfer-targets'
  )
  if (!transferTargetsTile) {
    logError('No transfer targets tile found!')
    return null
  }
  return transferTargetsTile
}

/* 1. Bid Price Min, 2. Bid Price Max, 3. Buy Now Price Min, 4. Buy Now Price Max*/
export const selectPriceFilterInputList = () => {
  const priceFilterInput = document.querySelectorAll<HTMLInputElement>(
    'div.search-prices > div.price-filter > div.ut-numeric-input-spinner-control > input'
  )
  if (!priceFilterInput) {
    logError('No "Price Filter" input found!')
    return null
  }
  return priceFilterInput
}

export const selectPlayerNameInput = () => {
  const playerNameInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Type Player Name"]'
  )

  if (!playerNameInput) {
    logError('No "Player Name" input found!')
    return null
  }
  return playerNameInput
}
