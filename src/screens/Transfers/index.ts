import Logger from '@logger'
import State from '@state'
import {
  selectAddPlayerButton,
  selectBuyNowPriceInput,
  selectClearSoldButton,
  selectClubSearchButton,
  selectListForTransferButton,
  selectListOnTransferMarketButton,
  selectPlayerNameInput,
  selectPriceFilterInputList,
  selectQuickSellButton,
  selectReListAllButton,
  selectStartPriceInput,
  selectTransferListTile,
  selectTransferMarketTile,
  selectTransferTargetsTile,
  selectYesButton,
} from '@selectors'
import settings from '@settings'
import { Quality, Rarity, SortBy } from '@shared'

import utils from '../../utils'
import SearchFilters from '../../utils/SearchFilters'

const { logError, logInfo } = Logger

class Transfers {
  searchFilters = new SearchFilters()
  state = new State()
  filterActionsNamesList = [
    'focusBidPriceMin',
    'focusBidPriceMax',
    'focusBuyNowPriceMin',
    'focusBuyNowPriceMax',
  ]
  clubSearchActionsList = [
    {
      actionName: 'clubSearchBronzeRarePlayerItems',
      quality: Quality.Bronze,
      rarity: Rarity.Rare,
    },
    {
      actionName: 'clubSearchSilverRarePlayerItems',
      quality: Quality.Silver,
      rarity: Rarity.Rare,
    },
    {
      actionName: 'clubSearchGoldRarePlayerItems',
      quality: Quality.Gold,
      rarity: Rarity.Rare,
    },
    {
      actionName: 'clubSearchBronzeCommonPlayerItems',
      quality: Quality.Bronze,
      rarity: Rarity.Common,
    },
    {
      actionName: 'clubSearchSilverCommonPlayerItems',
      quality: Quality.Silver,
      rarity: Rarity.Common,
    },
    {
      actionName: 'clubSearchGoldCommonPlayerItems',
      quality: Quality.Gold,
      rarity: Rarity.Common,
    },
  ]

  preDefinedListings = [
    {
      actionName: 'bronzeRareList',
      startPrice: settings.Selling.Bronze.Rare.StartPrice,
      buyNowPrice: settings.Selling.Bronze.Rare.BuyNowPrice,
      playerType: 'Bronze Rare',
    },
    {
      actionName: 'bronzeCommonList',
      startPrice: settings.Selling.Bronze.Common.StartPrice,
      buyNowPrice: settings.Selling.Bronze.Common.BuyNowPrice,
      playerType: 'Bronze Common',
    },
    {
      actionName: 'silverRareList',
      startPrice: settings.Selling.Silver.Rare.StartPrice,
      buyNowPrice: settings.Selling.Silver.Rare.BuyNowPrice,
      playerType: 'Silver Rare',
    },
    {
      actionName: 'silverCommonList',
      startPrice: settings.Selling.Silver.Common.StartPrice,
      buyNowPrice: settings.Selling.Silver.Common.BuyNowPrice,
      playerType: 'Silver Common',
    },
  ]

  makePriceFilterActions = () => {
    return {
      ...Object.fromEntries(
        this.filterActionsNamesList.map((priceFilterName, index) => {
          return [
            priceFilterName,
            () => {
              const priceFilterInputList = selectPriceFilterInputList()

              if (!priceFilterInputList) {
                logError(`Could not find price filter input list!`)
                return
              }

              const priceFilterInput = priceFilterInputList[index]
              if (!priceFilterInput) {
                logError(`Could not find price filter input!`)
                return
              }
              priceFilterInput.focus()
              priceFilterInput.select()
            },
          ]
        })
      ),
    }
  }

  private listPlayerItemOnTransferMarket = (
    startPrice: string,
    buyNowPrice: string,
    playerType = 'Unknown Player Type'
  ) => {
    const listOnTransferMarketButton = selectListOnTransferMarketButton()
    if (!listOnTransferMarketButton) {
      throw new Error('Could not find list on transfer market button!')
    }
    logInfo('Pressing "List on Transfer Market" button!')
    utils.simulateClick(listOnTransferMarketButton)

    utils.waitFor(() => {
      const startPriceInput = selectStartPriceInput()
      if (!startPriceInput) {
        throw new Error('Start price input not found!')
      }
      utils.focusInput(startPriceInput)
      startPriceInput.value = startPrice

      const buyNowPriceInput = selectBuyNowPriceInput()
      if (!buyNowPriceInput) {
        throw new Error('Buy now price input not found!')
      }

      utils.focusInput(buyNowPriceInput)

      buyNowPriceInput.value = buyNowPrice

      const listForTransferButton = selectListForTransferButton()
      if (!listForTransferButton) {
        throw new Error('List for transfer button not found!')
      }

      utils.simulateClick(listForTransferButton)
      logInfo(
        `${playerType} Player listed on Transfer Market for: "Start Price" ${startPrice} coins and "Buy Now Price" ${buyNowPrice} coins!`
      )
    }, 1000)
  }
  private searchForPlayerItem = async (
    quality: Quality,
    rarity: Rarity,
    sortBy: SortBy
  ) => {
    try {
      await this.searchFilters.setSortBy(sortBy)
      await this.searchFilters.setQuality(quality)
      await this.searchFilters.setRarity(rarity)
    } catch (err) {
      return logError(
        `Club Search failed: ${(err as Error)?.message || err}, stack: ${
          (err as Error).stack
        }`
      )
    }

    logInfo(
      `"Sort By" set to: "${this.state.currentSlice.SearchFilters.SortBy}", searching for: "Quality" : ${this.state.currentSlice.SearchFilters.Quality}, "Rarity": ${this.state.currentSlice.SearchFilters.Rarity}`
    )

    const clubSearchButton = selectClubSearchButton()
    if (!clubSearchButton) {
      return logError('No "Club Search" button, aborting!')
    }

    return utils.simulateClick(clubSearchButton)
  }

  focusPlayerNameInput = () => {
    const playerNameInput = selectPlayerNameInput()
    if (!playerNameInput) {
      throw new Error('No player name input found! Aborting!')
    }

    playerNameInput.focus()
    playerNameInput.select()
  }

  clickSearchTransferMarketButton = () => {
    const searchButton = [
      ...document.querySelectorAll<HTMLElement>(
        'div.button-container > button.call-to-action'
      ),
    ].filter((btn) => {
      return btn.textContent === 'Search'
    })[0]
    if (!searchButton) {
      logError('No "Search Button" found! Aborting!')
      return
    }
    utils.simulateClick(searchButton)
  }
  clickTransferMarketTile = () => {
    const transferMarketTile = selectTransferMarketTile()

    if (!transferMarketTile) {
      logError('No "Transfer Market" tile found!')
      return
    }

    utils.simulateClick(transferMarketTile)
  }

  clickTransferListTile = () => {
    const transferListTile = selectTransferListTile()

    if (!transferListTile) {
      logError('No "Transfer List" tile found!')
      return
    }

    utils.simulateClick(transferListTile)
  }

  clickTransferTargetsTile = () => {
    const transferTargetsTile = selectTransferTargetsTile()

    if (!transferTargetsTile) {
      logError('No "Transfer Targets" tile found!')
      return
    }

    utils.simulateClick(transferTargetsTile)
  }

  clearSoldItems = () => {
    const clearSoldButton = selectClearSoldButton()
    if (clearSoldButton) {
      utils.simulateClick(clearSoldButton)
    } else {
      logError('No clear sold button found!')
    }
  }

  quickSell = () => {
    const quickSellButton = selectQuickSellButton()
    if (quickSellButton) {
      utils.simulateClick(quickSellButton)
    } else {
      logError('No "Quick Sell" button, aborting!')
      return
    }

    // Wait for confirmation modal to appear
    utils.waitFor(() => {
      const yesButton = selectYesButton()
      if (yesButton) {
        logInfo(`Clicking modal confirmation "Yes" button: ${yesButton}`)
        utils.simulateClick(yesButton)
      } else {
        logError('No modal confirmation "Yes" button found!')
      }
    }, 2000)
  }

  addPlayer = () => {
    const addPlayerButton = selectAddPlayerButton()
    if (addPlayerButton) {
      logInfo('Clicking "Add Player" button')
      utils.simulateClick(addPlayerButton)
    } else {
      logError('No "Add Player" button, aborting!')
    }
  }
  reListAll = () => {
    const reListAllButton = selectReListAllButton()
    if (reListAllButton) {
      utils.simulateClick(reListAllButton)
    } else {
      logError('No re-list all button found!')
    }

    // Wait for confirmation modal to appear
    utils.waitFor(() => {
      const yesButton = selectYesButton()
      if (yesButton) {
        utils.simulateClick(yesButton)
      } else {
        logError('No modal confirmation "Yes" button found!')
      }
    })
  }
  clickBuyNow = () => {
    const buyNowButton =
      document.querySelectorAll<HTMLElement>('button.buyButton')[0]
    if (!buyNowButton) {
      logError('No "Buy Now" button found! Aborting!')
      return
    }
    utils.simulateClick(buyNowButton)

    utils.waitFor(() => {
      const yesButton = selectYesButton()
      if (yesButton) {
        utils.simulateClick(yesButton)
      } else {
        logError('No modal confirmation "Yes" button found!')
      }
    }, 500)
  }
  makeClubSearchActions = () => {
    return this.clubSearchActionsList.reduce(
      (accumulator, { actionName, quality, rarity }) => {
        return {
          ...accumulator,
          [actionName]: (sortBy: SortBy) => {
            return this.searchForPlayerItem(quality, rarity, sortBy)
          },
        }
      },
      {}
    )
  }
  makePreDefinedListingActions = () => {
    return this.preDefinedListings.reduce(
      (accumulator, { actionName, startPrice, buyNowPrice, playerType }) => {
        return {
          ...accumulator,
          [actionName]: async () => {
            return await this.listPlayerItemOnTransferMarket(
              startPrice,
              buyNowPrice,
              playerType
            )
          },
        }
      },
      {}
    )
  }

  setBronzeQuality = async () => {
    try {
      await this.searchFilters.setQuality(Quality.Bronze)
    } catch (err) {
      logError(
        `Failed to set bronze quality! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
    logInfo(`Set search quality to ${Quality.Bronze}!`)
  }

  setSilverQuality = async () => {
    try {
      await this.searchFilters.setQuality(Quality.Silver)
    } catch (err) {
      logError(
        `Failed to set silver quality! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
    logInfo(`Set search quality to ${Quality.Silver}!`)
  }

  setGoldQuality = async () => {
    try {
      await this.searchFilters.setQuality(Quality.Gold)
    } catch (err) {
      logError(
        `Failed to set gold quality! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
    logInfo(`Set search quality to ${Quality.Gold}!`)
  }

  setRareRarity = async () => {
    try {
      await this.searchFilters.setRarity(Rarity.Rare)
    } catch (err) {
      logError(
        `Failed to set rare rarity! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
    logInfo(`Set search rarity to ${Rarity.Rare}!`)
  }

  setCommonRarity = async () => {
    try {
      await this.searchFilters.setRarity(Rarity.Common)
    } catch (err) {
      logError(
        `Failed to set common rarity! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
    logInfo(`Set search rarity to ${Rarity.Common}!`)
  }

  customPriceList = async () => {
    const startPrice = prompt('Please input "Start Price" value.')
    const buyNowPrice = prompt('Please input "Buy Now Price" value.')
    if (!startPrice || !buyNowPrice) {
      logError(
        'Invalid start price or buy now price! Aborting "customPriceList" action!'
      )
      return
    }
    try {
      await this.listPlayerItemOnTransferMarket(startPrice, buyNowPrice)
    } catch (err) {
      logError(
        `Failed to listed player item on transfer market! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
  }

  getActions() {
    return {
      ...this.makePriceFilterActions.call(this),
      focusPlayerNameInput: this.focusPlayerNameInput,
      clearSoldItems: this.clearSoldItems,
      quickSell: this.quickSell,
      addPlayer: this.addPlayer,
      reListAll: this.reListAll,
      clickBuyNow: this.clickBuyNow,
      /* Set filter values */
      ...this.makeClubSearchActions.call(this),
      ...this.makePreDefinedListingActions.call(this),
      setBronzeQuality: this.setBronzeQuality,
      setSilverQuality: this.setSilverQuality,
      setGoldQuality: this.setGoldQuality,
      setRareRarity: this.setRareRarity,
      setCommonRarity: this.setCommonRarity,
      customPriceList: this.customPriceList,
      clickTransferListTile: this.clickTransferListTile,
      clickTransferMarketTile: this.clickTransferMarketTile,
      clickTransferTargetsTile: this.clickTransferTargetsTile,
      clickSearchTransferMarketButton: this.clickSearchTransferMarketButton,
    }
  }
}

export default Transfers
