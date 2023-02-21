import { StateInterface } from '@state'
import { NavigationInterface } from '@navigation'

declare global {
  interface Window {
    AutoFutState: StateInterface
    AutoFutNavigation: NavigationInterface
    AutoFutErrors: string[]
  }

  const chrome: {
    devtools: {
      inspectedWindow: {
        eval: (code: string) => void
      }
    }
    storage: {
      sync: {
        get: (key: string | null, callback: (settings: any) => void) => void
      }
    }
  }
}
