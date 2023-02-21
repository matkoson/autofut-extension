import Navigation from '@navigation'
import type {
  Club,
  Home,
  Leaderboards,
  Settings,
  Squads,
  Stadium,
  Store,
  Transfers,
} from '@screens/index'
import Shared from '@shared'

export type MergedActions = {
  Navigation: ReturnType<typeof Navigation.prototype.getActions>
  Home: ReturnType<typeof Home.prototype.getActions>
  Squads: ReturnType<typeof Squads.prototype.getActions>
  Transfers: ReturnType<typeof Transfers.prototype.getActions>
  Stadium: ReturnType<typeof Stadium.prototype.getActions>
  Store: ReturnType<typeof Store.prototype.getActions>
  Club: ReturnType<typeof Club.prototype.getActions>
  Leaderboards: ReturnType<typeof Leaderboards.prototype.getActions>
  Settings: ReturnType<typeof Settings.prototype.getActions>
  Shared: ReturnType<typeof Shared.prototype.getActions>
}

export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never
export type ActionsType = Unpacked<MergedActions>
