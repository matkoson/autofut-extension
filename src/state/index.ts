// TODO: improve 'newPropertyValue' type, as it should be dynamically determined, depending on the screen we are currently at

import Navigation from '@navigation'
import Logger from '@logger'

import { initialState } from './initial'
import { ScreenInterface, SearchFilters, StateInterface } from './types'

type ScreenNames = keyof StateInterface
type ScreenProperties = keyof ScreenInterface
type SearchFilterTypes = keyof SearchFilters

const { logInfo, logDebug } = Logger

class State {
  navigation = new Navigation()

  get currentSlice() {
    return window.AutoFutState[this.navigation.currentScreen]
  }

  _set = (
    screenProperty: ScreenProperties,
    filterType: SearchFilterTypes,
    newPropertyValue: StateInterface[ScreenNames][ScreenProperties][SearchFilterTypes]
  ) => {
    const { currentScreen } = this.navigation
    if (!currentScreen) {
      throw new Error('No current path found in state!')
    }

    const relevantStateSlice = this.currentSlice

    logInfo(`Setting ${currentScreen}.${filterType} to "${newPropertyValue}"`)
    let searchFilter = relevantStateSlice[screenProperty][filterType]
    return (searchFilter = newPropertyValue)
  }

  set(): {
    [key in ScreenProperties]: {
      [searchFiltersKey in SearchFilterTypes]: (
        newPropertyValue: string | null
      ) => void
    }
  } {
    const relevantStateSlice = this.currentSlice
    console.info('relevantStateSlice:', relevantStateSlice)
    const result = {
      ...Object.keys(relevantStateSlice).reduce(
        (accumulator, statePropertyName) => {
          logInfo('statePropertyName:', statePropertyName)
          /* E.g. Search Filters */
          return (accumulator = {
            ...accumulator,
            [statePropertyName]: {
              ...Object.keys(relevantStateSlice[statePropertyName]).reduce(
                (nestedAccumulator, nestedStatePropertyName) => {
                  console.info(
                    'nestedStatePropertyName:',
                    nestedStatePropertyName
                  )
                  /* E.g. SortBy */
                  return (nestedAccumulator = {
                    ...nestedAccumulator,
                    [nestedStatePropertyName]: (
                      newPropertyValue: string | null
                    ) => {
                      return this._set(
                        statePropertyName,
                        nestedStatePropertyName,
                        newPropertyValue
                      )
                    },
                  })
                },
                {}
              ),
            },
          })
        },
        {}
      ),
    }

    return result
  }
  static init() {
    window.AutoFutState = initialState
    logInfo('AutoFut State initialized')
  }
}

export default State
export * from './types'
