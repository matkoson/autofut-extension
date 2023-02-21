import data from '@data'

const settings = {
  Selling: {
    Bronze: {
      Rare: {
        StartPrice: '500',
        BuyNowPrice: '600',
      },
      Common: {
        StartPrice: '300',
        BuyNowPrice: '400',
      },
    },
    Silver: {
      Common: {
        StartPrice: '300',
        BuyNowPrice: '400',
      },
      Rare: {
        StartPrice: '600',
        BuyNowPrice: '800',
      },
    },
  },
  logLevel: data.LogLevel.Debug,
  extensionName: 'autofut',
  debug: true,
  richTextEditorId: 'waffle-rich-text-editor',
  // Returns a nested map of mode => key => commandName.
  parse(configText: any) {
    const lines = configText.trim().split('\n')
    const keyBindings = {}
    for (let line of lines) {
      line = line.trim()
      if (line == '') {
        // eslint-disable-next-line no-continue
        continue
        // eslint-disable-next-line no-inline-comments
      } // Ignore blank lines.
      const [mapCommand, key, commandName] = line.split(/\s+/)
      // TODO(philc): return validation errors.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!keyBindings['normal']) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keyBindings['normal'] = {}
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      keyBindings['normal'][key] = commandName
    }
    return keyBindings
  },
  // Reads the user's keybindings out of Chrome storage.
  getKeybindings() {
    const value = ''
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return parse('')
  },
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default settings
