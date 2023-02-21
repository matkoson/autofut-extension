import Logger from '@logger'

const { logInfo, logSuccess } = Logger

const init = () => {
  const innocuousElement = document.createElement('div')
  innocuousElement.setAttribute('id', 'innocuous')
  document.body.appendChild(innocuousElement)
  return innocuousElement
}

export const cleanup = () => {
  const innocuousElement = document.getElementById('innocuous')
  if (innocuousElement) {
    innocuousElement.remove()
  }
  logSuccess('Injection cleanup complete!')
}

// setTimeout(injectListener, 4000)
export const register = (iify: string) => {
  const innocuousElement = init()
  logInfo('Injecting Script')
  const script = document.createElement('script')
  script.textContent = iify
  ;(document.head || document.documentElement).appendChild(script)
  script.remove()

  return innocuousElement
}
