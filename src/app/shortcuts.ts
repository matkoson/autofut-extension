/* eslint-disable id-length*/
/**
 * TODO:
 * 0. "Gold High to Low":
 *  - clear player position
 *  - set "Gold" as "Quality"
 *  - set "Sort By" as "High to Low"
 *  - click Search
 * 0. "Bronze listing", so:
 * - "List on Transfer Market" button click
 * - "Start Price" input focus 500
 * - "Buy Now Price" input focus 600
 * - "List for Transfer" button click
 * 1. arrows should allow to travel between player items
 * 2. similar to "quick sell" - "player bio", "send to my club", "send to active squad", "compare price"
 * 3. add UI element confirming autofut has finished loading, in the same spot "futinator" was drawing something
 * 4. (future) add another UI element, displaying the current Futbin player price next to his card. API calls are already written in the TODO folder.
 * 5. Figure out how those buying bots are working under the hood. This Ukr had some repo on Github, I should check it out.
 * 6. Quicker buying, so methods with pre-defined criteria to query Transfer Market, e.g. "Gold Commons for max 450 coins", "Bronze Rare for max 250 coins", etc.
 */
import { ActionsType } from '@connector'
import Logger from '@logger'

import Actions from './actions'
import { keyMap } from './keyMap'
import { Commands } from './types'

const { logDebug, logWarn, logSuccess } = Logger
/* TODO: add validation for keybindings, to not block one another, e.g. 'p,s,s' blocks 'p,s' etc.*/
const shortcuts: {
  bindings: typeof keyMap
  commands: Commands
} = {
  bindings: keyMap,
  commands: null,
}
const invalidActions: string[] = []
const validActions: string[] = []

shortcuts.commands = Object.fromEntries(
  Object.values(shortcuts.bindings)
    .map((value) => {
      const isValid = Actions[value as keyof ActionsType]
      if (!isValid) {
        logWarn(`No action found for Commands['${value}']!`)
        invalidActions.push(value)
      } else {
        validActions.push(value)
      }
      return [
        value,
        {
          fn: isValid
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              Actions[value as keyof ActionsType].bind(Actions)
            : () => {
                return ''
              },
        },
      ]
    })
    .filter(Boolean)
)

if (!shortcuts.commands) {
  throw new Error("No commands found on 'shortcuts' object!")
}

if (!invalidActions.length) {
  logSuccess('All actions are valid!')
} else {
  logWarn('Invalid actions:', JSON.stringify(invalidActions, null, 2))
  logDebug('Valid actions:', JSON.stringify(validActions, null, 2))
}

shortcuts.commands = {
  ...shortcuts.commands,
  ...{
    // "j": "moveDownAndSelect",
    // "k": "moveUpAndSelect",
    // "h": "moveLeftAndSelect",
    // "l": "moveRightAndSelect",
    // "y": "copy",
    // "y,y": null // Unbind "copy row", because it's superceded by "copy"
    // ,
    // "<C-k>": null // Unbind move to next tab
    // ,
    // "<C-j>": null, // Unbind move to previous tab
    // "J": null, // Unbind move to previous tab
    // "K": null // Unbind move to next tab
  },
}
export default shortcuts
export * from './types'
