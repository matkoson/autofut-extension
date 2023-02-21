/* Connector will go through all the actions, from all screens, and with the knowledge of State, will decide which version of the method should be used. For the most part, it will only pass methods through*/

import { ActionsType, MergedActions } from './types'

class Connector {
  actions: MergedActions
  constructor(actions: MergedActions) {
    this.actions = actions
  }

  getActions = (): ActionsType => {
    const flattenedActions = Object.entries(this.actions).reduce(
      (accumulator, [key, value]) => {
        return (accumulator = { ...accumulator, ...value })
      },
      {}
    )
    return flattenedActions as ActionsType
  }
}
export default Connector
export * from './types'
