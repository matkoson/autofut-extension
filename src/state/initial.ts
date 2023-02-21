import type { ScreenInterface, StateInterface } from './types'

const sharedInitialScreenState: ScreenInterface = {
  SearchFilters: {
    SortBy: null,
    Quality: null,
    Rarity: null,
    Position: null,
    Nationality: null,
  },
}

export const initialState: StateInterface = {
  Home: { ...sharedInitialScreenState },
  Squads: { ...sharedInitialScreenState },
  Sbc: { ...sharedInitialScreenState },
  Transfers: { ...sharedInitialScreenState },
  Stadium: { ...sharedInitialScreenState },
  Store: { ...sharedInitialScreenState },
  Club: { ...sharedInitialScreenState },
  Leaderboards: { ...sharedInitialScreenState },
  Settings: { ...sharedInitialScreenState },
}
