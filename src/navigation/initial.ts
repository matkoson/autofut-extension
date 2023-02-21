import type { NavigationInterface } from './types'
import { Screens, Selectors } from './enums'

export const initialNavigation: NavigationInterface = {
  Previous: {
    PathName: null,
    PathSelector: null,
  },
  Current: {
    Initial: true,
    PathName: Screens.Home,
    PathSelector: Selectors[Screens.Home],
  },
}
