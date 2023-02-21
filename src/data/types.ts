export interface FilterOptionsValues {
  'SortBy': string[]
  'Quality': string[]
  'Rarity': {
    Special: string[]
    NonSpecial: string[]
  }
  'Position': string[]
  'Chemistry Style': string[]
  'Nationality': string[]
}

type KeyNamesUnion = 'backspace' | 'left' | 'up' | 'right' | 'down' | 'esc'
interface Keyboard {
  KeyCodes: {
    backspace: number
    tab: number
    ctrlEnter: number
    enter: number
    shiftKey: number
    ctrlKey: number
    esc: number
    space: number
    pageUp: number
    pageDown: number
    end: number
    home: number
    leftArrow: number
    upArrow: number
    rightArrow: number
    downArrow: number
    deleteKey: number
    f1: number
    f12: number
  }
  KeyNames: {
    [key: number]: KeyNamesUnion
  }
  KeyIdentifierCorrectionMap: {
    [key: string]: string[]
  }
}
export interface Data {
  Events: {
    [key: string]: string
  }
  LogLevel: {
    [key: string]: number
  }
  Shared: {
    FilterOptionsValues: FilterOptionsValues
    FilterButtons: {
      [key: string]: string
    }
    LogLevels: {
      [key: string]: number
    }
  }
  Keyboard: Keyboard
}
