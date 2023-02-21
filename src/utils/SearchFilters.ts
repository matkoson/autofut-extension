import data from '@data'
// eslint-disable-next-line no-duplicate-imports
import type { FilterOptionsValues } from '@data'
import State from '@state'
import Logger from '@logger'
import { Quality, SortBy } from '@shared'

import { FilterOptions } from './enums'

import utils from './index'

const { logInfo } = Logger

class SearchFilters {
  state = new State()

  constructor(resetFilters = false) {
    // Reset filters at init
    if (resetFilters) {
      this.clearAllSelectedOptions()
    }
  }

  private clearAllSelectedOptions = () => {
    const closeButtonsAtRowsWithSelection = [
      ...document.querySelectorAll<HTMLElement>(
        'div.inline-list-select.has-selection'
      ),
    ]
      .map((selectWithSelection) => {
        return selectWithSelection.querySelector('button')
      })
      .filter((maybeButton) => {
        return maybeButton instanceof HTMLButtonElement
      })
      .filter(Boolean)

    closeButtonsAtRowsWithSelection.filter(Boolean).forEach((closeButton) => {
      utils.simulateClick(closeButton as HTMLElement)
    })
  }

  getFilterOptions = async (
    filterName: FilterOptions
  ): Promise<NodeListOf<HTMLElement>> => {
    let expectedDropdownValues: string[] | null = null
    Object.keys(data.Shared.FilterOptionsValues).forEach((filterOption) => {
      if (filterOption === filterName) {
        const isRarity = filterName === 'Rarity'
        const isSpecial =
          this.state.currentSlice.SearchFilters.Quality === 'Special'

        if (isRarity) {
          expectedDropdownValues =
            data.Shared.FilterOptionsValues.Rarity[
              isSpecial ? 'Special' : 'NonSpecial'
            ]
        } else {
          type FilterOptionsExcludingRarity = Exclude<
            FilterOptionsValues,
            'Rarity'
          >
          /* Casting value to string[], as when using keys with exclusion of "Rarity", we will always get output of this type.*/
          expectedDropdownValues = data.Shared.FilterOptionsValues[
            filterOption as keyof FilterOptionsExcludingRarity
          ] as string[]
        }
      }
    })
    if (!expectedDropdownValues) {
      throw new Error(`No expected dropdown values found for ${filterName}`)
    }

    const correctOptionsList = await this.getFilterOptionsList(
      expectedDropdownValues
    )

    return correctOptionsList
  }

  /* Used after clicking on one of filter select elements. We wait for the dropdown to be added to DOM, as a result of simulating a click, then, knowing which select we intended to press, we are querying for the expected options list.
   *
   * @returns a validated list of options for the filter select element, if found.
   * */
  private getFilterOptionsList = async (
    expectedDropdownValues: string[]
  ): Promise<NodeListOf<HTMLElement>> => {
    const availableDropdownOptionsList =
      await utils.waitForElement<HTMLUListElement>('ul.inline-list')

    if (!availableDropdownOptionsList.length) {
      throw new Error('No dropdown options list found!')
    }

    const correctDropDownOptions = [...availableDropdownOptionsList].filter(
      (list, index) => {
        const listItemsInnerTexts = [...list.querySelectorAll('li')].map(
          (li) => {
            return li.textContent
          }
        )

        // Expectation: the list of found options contains ALL the expected values, and possibly more
        const isCorrect = expectedDropdownValues.every(
          (expectedOptionValue) => {
            const includes = listItemsInnerTexts.includes(expectedOptionValue)
            return includes
          }
        )
        return isCorrect
      }
    )
    // Assumption: there is only one correct dropdown options list
    if (!correctDropDownOptions.length) {
      throw new Error('No correct dropdown options list found!')
    }

    return correctDropDownOptions[0].querySelectorAll<HTMLElement>('li')
  }
  /* TODO add stricter input type */
  private getFilterButton = (buttonName: string): HTMLElement => {
    if (!Object.keys(data.Shared.FilterButtons).includes(buttonName)) {
      throw new Error(`Unknown filter name provided: "${buttonName}"!`)
    }
    const button = Array.from(
      document.querySelectorAll<HTMLElement>(
        'div.ut-search-filter-control--row'
      )
    )
      .filter((controlRow) => {
        return controlRow.querySelector<HTMLElement>('span.label')
      })
      .filter((controlRowWithSpan) => {
        const label =
          controlRowWithSpan.querySelector<HTMLElement>('span.label')
        if (!label) {
          return false
        }
        return label.textContent === buttonName
      })[0]

    return button
  }

  /* TODO: check again if that really is the way I want to identify the correct filter option*/
  private getSingleFilterOption = (
    optionName: string,
    optionsList: NodeListOf<HTMLElement>
  ) => {
    const filterOption = [...optionsList].find((option) => {
      return option.innerText === optionName
    })

    if (!filterOption) {
      throw new Error(`No option found for ${optionName}`)
    }

    return filterOption
  }
  setSortBy = async (sortByOptionName: SortBy) => {
    const sortByDropdownButton = [
      ...document.querySelectorAll<HTMLElement>(
        'div.inline-list-select.ut-drop-down-control'
      ),
    ]
      .filter((controlElement) => {
        const previousSibling = controlElement.previousElementSibling
        if (!previousSibling) {
          return false
        }
        return previousSibling.textContent === 'Sort By'
      })[0]
      .querySelector<HTMLElement>('div.inline-container')

    if (!sortByDropdownButton) {
      throw new Error("No 'Sort By' dropdown found!")
    }

    utils.simulateClick(sortByDropdownButton)

    const sortByDropdownOptions = await this.getFilterOptions(
      FilterOptions.SortBy
    )

    if (!sortByDropdownOptions.length) {
      throw new Error('No "Sort By" dropdown options found, aborting!')
    }

    logInfo(`Setting "Sort By" to ${sortByOptionName}`)
    const setSortBy = this.getSingleFilterOption(
      sortByOptionName,
      sortByDropdownOptions
    )

    if (!setSortBy) {
      throw new Error(
        `No "Sort By" option found for ${sortByOptionName}, aborting!`
      )
    }

    this.state.set().SearchFilters.SortBy(sortByOptionName)
    utils.simulateClick(setSortBy)
  }
  /* "Bronze" | "Silver" | "Gold" | "Special"*/
  setQuality = async (qualityOptionName: Quality) => {
    const qualityDropdownButton = this.getFilterButton('Quality')
    if (!qualityDropdownButton) {
      throw new Error('No "Quality" dropdown, aborting!')
    }

    utils.simulateClick(qualityDropdownButton)

    const qualityDropdownOptions = await this.getFilterOptions(
      FilterOptions.Quality
    )

    if (!qualityDropdownOptions.length) {
      throw new Error('No "Quality" dropdown options, aborting!')
    }
    logInfo(`Selecting ${qualityOptionName} option`)
    const qualityOption = this.getSingleFilterOption(
      qualityOptionName,
      qualityDropdownOptions
    )

    if (!qualityOption) {
      throw new Error(`No "${qualityOptionName}" quality option, aborting!`)
    }
    this.state.set().SearchFilters.Quality(qualityOptionName)
    utils.simulateClick(qualityOption)
  }

  /* "Rare" | "Common"*/
  /* TODO: use more strict type for parameter*/
  setRarity = async (rarityOptionName: string) => {
    const rarityDropdownButton = this.getFilterButton('Rarity')
    if (!rarityDropdownButton) {
      throw new Error('No "Rarity" dropdown button, aborting!')
    }
    utils.simulateClick(rarityDropdownButton)

    const rarityDropdownOptions = await this.getFilterOptions(
      FilterOptions.Rarity
    )
    if (!rarityDropdownOptions.length) {
      throw new Error('No "Rarity" dropdown options found, aborting!')
    }

    const rarityOption = this.getSingleFilterOption(
      rarityOptionName,
      rarityDropdownOptions
    )
    if (!rarityOption) {
      throw new Error(`No $(rarityOptionName) rarity option, aborting!`)
    }

    this.state.set().SearchFilters.Rarity(rarityOptionName)
    utils.simulateClick(rarityOption)
    await utils.wait(3000)
  }
}

export default SearchFilters
