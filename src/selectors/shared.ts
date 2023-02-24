export const selectYesButton = () => {
  return [
    ...document.querySelectorAll<HTMLElement>(
      'div.ea-dialog-view--body > div.ut-button-group > button'
    ),
  ].filter((button) => {
    return button.className !== 'negative'
  })[0]
}

export const selectCancelButton = () => {
  const buttons = [
    ...document.querySelectorAll<HTMLElement>(
      'div.ea-dialog-view--body > div.ut-button-group > button'
    ),
  ]

  return buttons.filter((button) => {
    return button.className === 'negative'
  })[0]
}

export const selectSendToMyClubButton = () => {
  return [
    ...document.querySelectorAll<HTMLElement>('div.ut-button-group > button'),
  ].filter((button) => {
    const buttonLabel = button?.querySelector<HTMLElement>('span.btn-text')
    if (buttonLabel === null) {
      throw new Error(`Could not find button label for button: ${button}`)
    }

    return buttonLabel.textContent === 'Send to My Club'
  })[0]
}

export const selectSyncClubButton = () => {
  const button = document.getElementById('autofut-btn-sync-club')

  return button
}
