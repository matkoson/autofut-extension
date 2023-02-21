import UI from '@ui'
import Injection from '@injection'
import Storage from '@storage'
import data from '@data'
import Logger from '@logger'
import Navigation from '@navigation'
import State from '@state'
import Observer from '@observer'
import utils from '@utils'
import { validateCommandsObject } from '@validate'

import { selectAutofutJsonMessage } from '../selectors/autofut'

import { keyMap } from './keyMap'
import shortcuts from './shortcuts'

const { logError, logInfo, logSuccess } = Logger

type Prefixes = { [key: string]: boolean }

class AutoFut {
  isInnocuousOn = false
  /* At cases, when I don't want to respond to keyboard input. */
  private ignoreKeyboardInput = false
  /* A map of mode -> comma-separated keys -> bool. The keys are prefixes to the user's bound keybindings. */
  private keyBindingPrefixes: Prefixes = {}
  /* Keys which were typed recently. */
  private keyQueue: string[] = []
  /* An arbitrary limit that should instead be equal to the longest key sequence that's actually bound. */
  private maxBindingLength = 3

  private keyBindings: typeof keyMap = {}
  injectUI() {
    new Observer().waitForFifaHeader(UI.injectBase)
  }

  injectPageScript() {
    /* We inject the page_script into the page so that we can simulate keypress events, which must be done by a   Page script, and not a content script.   See here for docs on how to inject page scripts: http://stackoverflow.com/a/9517879/46237 */
    const script = document.createElement('script')
    script.src = (chrome as any).extension.getURL('page_scripts/page_script.js')

    document.documentElement.appendChild(script)
    this.injectUI()
  }

  private observeInnocuous = (innocuousElement: HTMLDivElement) => {
    const { cleanup } = Injection
    const observer = new Observer()
    const storage = new Storage()
    const callback = (observer: MutationObserver, dis: string) => {
      logSuccess('"pls" found! Disconnecting observer!')

      observer.disconnect()
      // try {
      //   throw new Error('debugger')
      // } catch (err) {
      //   /**/
      // }
      // const handleSetPlsAlarm = () => {
      //   return storage.set(Storage.Enums.StorageKeys.pls, pls)
      // }
      // const handleSetDisAlarm = () => {
      //   return storage.set(Storage.Enums.StorageKeys.dis, dis)
      // }
      storage.set(Storage.Enums.StorageKeys.dis, dis)

      // chrome.alarms.create('setPlsAlarm', {
      //   delayInMinutes: 0.1,
      // })
      // chrome.alarms.create('setDisAlarm', {
      //   delayInMinutes: 0.1,
      // })
      //
      // chrome.alarms.onAlarm.addListener((alarm) => {
      //   if (alarm.name === 'setPlsAlarm') {
      //     handleSetPlsAlarm()
      //   } else if (alarm.name === 'setDisAlarm') {
      //     handleSetDisAlarm()
      //   }
      // })

      cleanup()
    }
    observer.waitForDis(innocuousElement, callback)
  }

  private registerKeyListener = () => {
    // Key event handlers fire on window before they do on document. Prefer window for key events so the page
    // Can't set handlers to grab keys before this extension does.
    window.addEventListener(
      'keydown',
      // eslint-disable-next-line id-length
      (e) => {
        return this.onKeydown(e)
      },
      true
    )
  }

  private registerInnocuousInjector = () => {
    window.onload = () => {
      const { IIFY } = Injection
      try {
        const innocuousElement = Injection.register(IIFY.onResponse)
        this.observeInnocuous(innocuousElement)
      } catch (err) {
        logError("Couldn't inject page script", err)
      }
    }
  }

  isEditable = (el: HTMLElement) => {
    // Note that the window object doesn't have a tagname.
    const tagName = el.tagName ? el.tagName.toLowerCase() : null
    return el.isContentEditable || tagName === 'input' || tagName === 'textarea'
  }

  loadUserKeybindings = () => {
    chrome.storage.sync.get(null, (chromeSettings) => {
      const userBindings =
        chromeSettings && chromeSettings.keyMappings
          ? chromeSettings.parse(chromeSettings.keyMappings)
          : {}
      const { bindings } = shortcuts
      this.keyBindings = { ...bindings, ...userBindings }
      this.keyBindingPrefixes = this.buildKeyBindingPrefixes()
    })
  }

  /* Returns a map of (partial keyString) => is_bound?
 Note that the keys only include partial keystrings for bindings. So the binding "dap" will add "d" and
  "da" keys to this map, but not "dap". */
  buildKeyBindingPrefixes = () => {
    const prefixes: Prefixes = {}
    for (let keyString in this.keyBindings) {
      // If the bound action is null, then treat this key as unbound.
      const action = this.keyBindings[keyString]
      if (!action) {
        // eslint-disable-next-line no-continue
        continue
      }
      const keys = keyString.split(',')
      // eslint-disable-next-line id-length
      for (let i = 0; i < keys.length - 1; i++) {
        keyString = keys.slice(0, i + 1).join(',')
        prefixes[keyString] = true
      }
    }
    return prefixes
  }

  // eslint-disable-next-line id-length
  cancelEvent = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // eslint-disable-next-line id-length,max-lines-per-function
  onKeydown = (e: any) => {
    // If there's a playerResultsList found, then I'm typing a player name, and then I don't want to navigate anywhere
    const playerSearchInput = document.querySelector(
      'input[placeholder="Type Player Name"]'
    )

    if (document.activeElement === playerSearchInput) {
      return
    }

    const keyString = utils.getKeyString(e)
    if (this.ignoreKeyboardInput) {
      return
    }

    if (!keyString) {
      return
    }
    /* Ignore key presses which are just modifiers. */

    this.keyQueue.push(keyString)
    if (this.keyQueue.length > this.maxBindingLength) {
      this.keyQueue.shift()
    }
    // See if a bound command matches the typed key sequence. If so, execute it.
    // Prioritize longer bindings over shorter bindings.
    for (
      // eslint-disable-next-line id-length
      let i = Math.min(this.maxBindingLength, this.keyQueue.length);
      i >= 1;
      i--
    ) {
      // eslint-disable-next-line no-var
      var fn
      const keySequence = this.keyQueue
        .slice(this.keyQueue.length - i, this.keyQueue.length)
        .join(',')
      // If this key could be part of one of the bound key bindings, don't pass it through to the page.
      // Also, if some longer binding partically matches this key sequence, then wait for more keys, and
      // Don't immediately apply a shorter binding which also matches this key sequence.
      const prefixesMatch = this.keyBindingPrefixes[keySequence]
      if (prefixesMatch) {
        this.cancelEvent(e)
        return
      }

      const bindingName = keyMap[keySequence]
      validateCommandsObject(shortcuts.commands)

      if (!shortcuts.commands) {
        throw new Error("Invalid 'Shortcuts' object!")
      }

      if (bindingName) {
        this.keyQueue = []
        this.cancelEvent(e)
        shortcuts.commands[bindingName].fn()
      }
    }
  }

  /* Modifiers: optional: an object with these boolean properties: meta, shift, control. */
  typeKey = (keyCode: any, modifiers: any) => {
    // eslint-disable-next-line no-eq-null
    if (keyCode == null) {
      throw 'The keyCode provided to typeKey() is null.'
    }
    this.ignoreKeyboardInput = true
    if (!modifiers) {
      modifiers = {}
    }

    const autoFutJsonMessageElement = selectAutofutJsonMessage()
    /* Registering keyboard mappings on created HTML element. */
    if (!autoFutJsonMessageElement) {
      throw new Error('Could not find autofut json message element.')
    }
    autoFutJsonMessageElement.textContent = JSON.stringify({
      keyCode,
      mods: modifiers,
    })

    window.dispatchEvent(new CustomEvent(data.Events.simulateKeyEvent, {}))
    this.ignoreKeyboardInput = false
  }

  init = () => {
    logInfo('Injecting page script!')
    this.injectPageScript()
    logInfo('Registering key listener!')
    this.registerKeyListener()
    logInfo('Loading user keybindings!')
    this.loadUserKeybindings()
    logInfo('Registering innocuous injector!')
    this.registerInnocuousInjector()
  }

  initAll() {
    /* Initialize State */
    this.init()

    /* Initialize State */
    State.init()

    /* Initialize Navigation */
    Navigation.init()
  }
}

export default AutoFut
