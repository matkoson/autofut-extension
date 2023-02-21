import { Navigation } from './enums'

export const selectBackButton = () => {
  return document.querySelector<HTMLElement>(
    "[class='ut-navigation-button-control']"
  )
}
export const selectLoginButton = () => {
  const button = Array.from(
    document.querySelectorAll<HTMLButtonElement>(Navigation.LoginButton)
  ).filter((btn) => {
    return btn.innerText === 'Login'
  })[0]

  return button
}
