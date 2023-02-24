import { syncClub } from '@app/syncClub'
import Logger from '@logger'

const { logInfo } = Logger

class UI {
  static injectBase = (fifaHeader: HTMLElement) => {
    // Make fifa header use flex-box
    fifaHeader.style.cssText = 'display: flex; justify-content: space-between;'

    const autofutUi = document.createElement('div')
    autofutUi.setAttribute(
      'style',
      'align-self: center;text-align: center;display: flex;justify-content: space-between;align-items: center; min-width: 500px;'
    )

    const span = document.createElement('span')
    span.setAttribute('style', 'margin-right: 50px;')
    span.innerHTML = 'AutoFut<br>by: matkoson'

    const button = document.createElement('button')
    button.setAttribute('class', 'btn-standard mini call-to-action')
    button.setAttribute('id', 'autofut-btn-sync-club')
    button.textContent = 'Sync Club'

    button.addEventListener('click', async () => {
      logInfo('Sync Club button clicked!')
      await syncClub()
    })

    autofutUi.appendChild(span)
    autofutUi.appendChild(button)

    fifaHeader.insertBefore(autofutUi, fifaHeader.childNodes[1])
  }
}

export default UI
