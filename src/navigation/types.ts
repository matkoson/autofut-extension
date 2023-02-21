import { Screens } from './enums'

export interface NavigationInterface {
  Previous: {
    PathName: string | null
    PathSelector: string | null
  }
  Current: {
    Initial: boolean
    PathName: Screens
    PathSelector: string
  }
}
