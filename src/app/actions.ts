import Connector from '@connector'
import Navigation from '@navigation'
import Shared from '@shared'
import {
  Club,
  Home,
  Leaderboards,
  Settings,
  Squads,
  Stadium,
  Store,
  Transfers,
} from '@screens/index'

const Actions = {
  /* New arch */
  ...new Connector({
    Navigation: new Navigation().getActions(),
    Home: new Home().getActions(),
    Squads: new Squads().getActions(),
    Transfers: new Transfers().getActions(),
    Stadium: new Stadium().getActions(),
    Store: new Store().getActions(),
    Club: new Club().getActions(),
    Leaderboards: new Leaderboards().getActions(),
    Settings: new Settings().getActions(),
    Shared: new Shared().getActions(),
  }).getActions(),
}

export default Actions
