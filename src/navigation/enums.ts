export enum Screens {
  Home = 'Home',
  Squads = 'Squads',
  Sbc = 'Sbc',
  Transfers = 'Transfers',
  Stadium = 'Stadium',
  Store = 'Store',
  Club = 'Club',
  Leaderboards = 'Leaderboards',
  Settings = 'Settings',
}

export type ScreensIndex = {
  [P in keyof typeof Screens]: string
}

export enum NavigationScreenActions {
  Home = 'navigateHome',
  Squads = 'navigateSquads',
  Sbc = 'navigateSbc',
  Transfers = 'navigateTransfers',
  Stadium = 'navigateStadium',
  Store = 'navigateStore',
  Club = 'navigateClub',
  Leaderboards = 'navigateLeaderboards',
  Settings = 'navigateSettings',
}

export type NavigationScreenActionsIndex = {
  [P in keyof typeof NavigationScreenActions]: string
}

export enum Selectors {
  BackButton = "[class='ut-navigation-button-control']",
  Home = '.icon-home',
  Squads = '.icon-squad',
  Sbc = '.icon-sbc',
  Transfers = '.icon-transfer',
  Stadium = '.icon-stadium',
  Store = '.icon-store',
  Club = '.icon-club',
  Leaderboards = '.icon-leaderboards',
  Settings = '.icon-settings',
}
