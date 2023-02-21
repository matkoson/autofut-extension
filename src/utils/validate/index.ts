/* eslint-disable func-style*/
import { Commands } from '@app/types'
import { keyMap, commandsKeys } from '@app/keyMap'
import { PlayerDetails } from '@screens/Club'

import { ValidPlayerDetails } from './types'

export function validateString(
  value: unknown,
  field: string
): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(
      `${field}: expected string but got ${typeof value}: ${value}`
    )
  }
}

export function validateDomElement<ExpectedDomType>(
  value: unknown
): asserts value is ExpectedDomType {
  if (!(value instanceof HTMLElement)) {
    throw new Error(`expected HTMLElement but got ${typeof value}: ${value}`)
  }
}

export function validatePlayerDetails(
  playerDetails?: PlayerDetails
): asserts playerDetails is ValidPlayerDetails {
  validateString(playerDetails?.name, 'name')
  validateString(playerDetails?.rating, 'rating')
  validateString(playerDetails?.position, 'position')
  validateDomElement<HTMLButtonElement>(playerDetails?.addButton)
  validateDomElement<HTMLElement>(playerDetails?.parentListElement)
}

export function validateCommandsObject(
  commands: unknown
): asserts commands is Commands {
  if (!commands || typeof commands !== 'object') {
    throw new Error(`expected object but got ${typeof commands}: ${commands}`)
  }

  const hasValidCommandsKeys = Object.keys(commands).every((key) => {
    return Object.values(commandsKeys).includes(key)
  })

  if (!hasValidCommandsKeys) {
    throw new Error(
      `Expected commands object to have keys ${Object.keys(
        commandsKeys
      )} but got ${Object.keys(commands)}`
    )
  }

  const hasValidCommandsValues = Object.values(commands).every((value) => {
    return Boolean(value.fn)
  })

  if (!hasValidCommandsValues) {
    throw new Error(
      `Expected commands object to have values of type function but got ${Object.values(
        commands
      )}`
    )
  }
}
