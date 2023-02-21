export interface SearchFilters extends Record<string, string | null> {
  SortBy: string | null
  Quality: string | null
  Rarity: string | null
  Position: string | null
  Nationality: string | null
}

export interface ScreenInterface extends Record<string, SearchFilters> {
  SearchFilters: SearchFilters
}

export interface StateInterface extends Record<string, ScreenInterface> {
  Home: ScreenInterface
  Squads: ScreenInterface
  Sbc: ScreenInterface
  Transfers: ScreenInterface
  Stadium: ScreenInterface
  Store: ScreenInterface
  Club: ScreenInterface
  Leaderboards: ScreenInterface
  Settings: ScreenInterface
}
