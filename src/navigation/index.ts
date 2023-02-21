import Logger from '@logger'
import { selectLoginButton } from '@selectors'

import utils from '../utils'

import {
  NavigationScreenActions,
  NavigationScreenActionsIndex,
  Screens,
  ScreensIndex,
  Selectors,
} from './enums'
import { initialNavigation } from './initial'

const { logInfo, logError } = Logger

class Navigation {
  get previous(): Screens | null {
    if (window.AutoFutNavigation.Previous.PathName !== null) {
      return Screens[
        window.AutoFutNavigation.Previous.PathName as keyof ScreensIndex
      ]
    }
    return null
  }
  private set previous(newPathName: Screens | null) {
    window.AutoFutNavigation.Previous.PathName = newPathName
  }

  get isInitial() {
    return window.AutoFutNavigation.Current.Initial
  }

  private set isInitial(newInitialValue: boolean) {
    window.AutoFutNavigation.Current.Initial = newInitialValue
  }

  get currentScreen(): Screens {
    return window.AutoFutNavigation.Current.PathName
  }

  private set currentScreen(newPathName: keyof ScreensIndex) {
    const newPath = Screens[newPathName]
    window.AutoFutNavigation.Current = {
      Initial: false,
      PathName: newPath,
      PathSelector: Selectors[newPath],
    }
  }

  private navigate = (newPathName: Screens, pathSelector: Selectors) => {
    try {
      const navButton = document.querySelector<HTMLButtonElement>(pathSelector)
      if (!navButton) {
        // Noinspection ExceptionCaughtLocallyJS
        throw new Error(
          `No navigation button found for selector: ${pathSelector}`
        )
      }

      if (this.isInitial) {
        this.isInitial = false
      }

      this.previous = this.currentScreen
      this.currentScreen = newPathName

      navButton.click()
      utils.simulateClick(navButton)
    } catch (err) {
      logError(
        `Could not navigate to "${newPathName}"! Error: ${err}, stack: ${
          (err as Error).stack
        }`
      )
    }
  }

  private makeNavigateActions = (): {
    [key in NavigationScreenActions]: () => void
  } => {
    return {
      ...Object.fromEntries(
        Object.keys(NavigationScreenActions).map((navigationActionKey) => {
          const navigationActionName =
            NavigationScreenActions[
              navigationActionKey as keyof NavigationScreenActionsIndex
            ]
          return [
            navigationActionName,
            () => {
              this.navigate(
                Screens[navigationActionKey as keyof ScreensIndex],
                Selectors[navigationActionKey as keyof ScreensIndex]
              )
            },
          ]
        })
      ),
    } as {
      [key in NavigationScreenActions]: () => void
    }
  }
  static clickLoginButton = () => {
    const loginButton = selectLoginButton()

    if (!loginButton) {
      logError('No "Login" button found!')
    }

    utils.simulateClick(loginButton)
  }

  goBack = () => {
    const navButton = document.querySelector<HTMLButtonElement>(
      Selectors.BackButton
    )
    if (navButton) {
      // If there's a back button found, we are staying in the current screen, so no changes to the navigation state
      logInfo('Clicking Back button!')

      navButton.click()
      utils.simulateClick(navButton)
    } else if (!this.isInitial && this.previous) {
      // If it isn't an initial location, there must be a previous location
      logInfo(`Navigating to the previous location: ${this.previous}!`)
      this.navigate(Screens[this.previous], Selectors[this.previous])
    } else {
      logInfo('No Back button detected nor previous location to go to!')
    }
  }

  getActions() {
    return {
      /* NavigateHome, navigateSquads, navigateSbc, navigateTransfers, navigateStadium, navigateStore, navigateClub, navigateLeaderboards, navigateSettings*/
      ...this.makeNavigateActions(),
      goBack: this.goBack,
      clickLoginButton: Navigation.clickLoginButton,
    }
  }
  static init() {
    window.AutoFutNavigation = initialNavigation
  }
}

export default Navigation
