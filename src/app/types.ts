import { keyMap } from './keyMap'

export type Commands = Record<keyof typeof keyMap, { fn: () => void }> | null
