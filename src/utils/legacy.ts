import data from '@data'

export interface CustomKeyboardEvent extends KeyboardEvent {
  keyCodeVal: string
  keyIdentifier: string
}


export class Legacy  {
  // Returns the string "<A-f>" if F is pressed.
  // eslint-disable-next-line max-lines-per-function
  static getKeyString = (event: any) => {
    const keyNames = data.Keyboard.KeyNames
    let keyString: string
    if (event.keyCode in keyNames) {
      keyString = keyNames[event.keyCode]
    } else if (event.altKey && event.key) {
      // The pressed key is a non-ASCII printing character in the current layout, and is ASCII in en_US, so we
      // Use the corresponding ASCII character. We do this because event.key when modified with Alt may
      // Represent a character other than the key in the user's keyboard layout. E.g. on Mac, <A-v> comes
      // Through as <A-√>.
      // See https://github.com/philc/vimium/issues/2147#issuecomment-230370011 for discussion.
      keyString = String.fromCharCode(event.which).toLowerCase()
    } else if (event.key.length === 1) {
      keyString = event.key
    } else if (
      event.key.length === 2 &&
      event.key >= 'F1' &&
      event.key <= 'F9'
    ) {
      // eslint-disable-next-line no-inline-comments
      keyString = event.key.toLowerCase() /* F1 to F9 */
    } else if (
      event.key.length === 3 &&
      event.key >= 'F10' &&
      event.key <= 'F12'
    ) {
      // eslint-disable-next-line no-inline-comments
      keyString = event.key.toLowerCase() /* F10 to F12 */
    } else {
      // Ignore modifiers by themselves.
      return
    }

    const modifiers = []

    if (event.shiftKey) {
      keyString = keyString.toUpperCase()
    }
    if (event.metaKey) {
      modifiers.push('M')
    }
    if (event.ctrlKey) {
      modifiers.push('C')
    }
    if (event.altKey) {
      modifiers.push('A')
    }

    for (const mod of Array.from(modifiers)) {
      keyString = `${mod}-${keyString}`
    }

    if (modifiers.length > 0) {
      keyString = `<${keyString}>`
    }
    // eslint-disable-next-line consistent-return
    return keyString
  };

  static createSimulatedKeyEvent = (
    el: HTMLElement,
    type: string,
    keyCode: string,
    keyIdentifier: string
  ) => {
    // How to do this in Chrome: http://stackoverflow.com/q/10455626/46237
    const event  = document.createEvent('KeyboardEvent') as CustomKeyboardEvent
    Object.defineProperty(event, 'keyCode', {
      get() {
        return this.keyCodeVal
      },
    })
    Object.defineProperty(event, 'which', {
      get() {
        return this.keyCodeVal
      },
    })
    Object.defineProperty(event, 'keyIdentifier', {
      get() {
        return keyIdentifier
      }    })
    event.initKeyboardEvent(
      type,
      true,
      true,
      document.defaultView,
      undefined,
      undefined,
      false,
      false,
      false,
      false
    )

    event.keyCodeVal = keyCode
    event.keyIdentifier = keyIdentifier
    return event
  }

  static simulateKeypress= (
    el: HTMLElement,
    keyCode: string,
    keyIdentifier: string,
  ) => {
    // Console.log ">>>> simulating keypress on:", el, keyCode, keyIdentifier
    el.dispatchEvent(
      // eslint-disable-next-line no-invalid-this
      this.createSimulatedKeyEvent(el, 'keydown', keyCode, keyIdentifier),
    )
    el.dispatchEvent(
      // eslint-disable-next-line no-invalid-this
      this.createSimulatedKeyEvent(el, 'keypress', keyCode, keyIdentifier),
    )
    el.dispatchEvent(
      // eslint-disable-next-line no-invalid-this
      this.createSimulatedKeyEvent(el, 'keyup', keyCode, keyIdentifier),
    )
  }
  static simulateClick = (el: HTMLElement | HTMLButtonElement, xAxis?: any, yAxis?: any) => {
    // eslint-disable-next-line no-eq-null
    if (xAxis == null) {
      xAxis = 0
    }
    // eslint-disable-next-line no-eq-null
    if (yAxis == null) {
      yAxis = 0
    }
    const eventSequence = ['mouseover', 'mousedown', 'mouseup', 'click']
    for (const eventName of eventSequence) {
      const event = document.createEvent('MouseEvents')
      // EventName, bubbles, cancelable, view, event-detail, screenX, screenY, clientX, clientY, ctrl, alt,
      // Shift, meta, button, relatedTarget
      event.initMouseEvent(
        eventName,
        true,
        true,
        window,
        1,
        xAxis,
        yAxis,
        xAxis,
        yAxis,
        false,
        false,
        false,
        false,
        0,
        null
      )
      el.dispatchEvent(event)
    }
  }
  static addOneTimeListener = (dispatcher: any, eventType: any, listenerFn: any) => {
    const handlerFn = function (event: any) {
      dispatcher.removeEventListener(eventType, handlerFn, true)
      return listenerFn(event)
    }
    return dispatcher.addEventListener(eventType, handlerFn, true)
  }

  static getMethods=() => {
    return{
      getKeyString: this.getKeyString,
      createSimulatedKeyEvent: this.createSimulatedKeyEvent,
      simulateKeypress: this.simulateKeypress,
      simulateClick: this.simulateClick,
      addOneTimeListener: this.addOneTimeListener,
    }
  }
}

export default Legacy
