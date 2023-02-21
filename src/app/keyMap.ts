export const keyMap = {
  // NOTE: onChange: UPDATE OBSIDIAN!
  // NOTE: Don't use 'P' or 'p'!
  // BLOCKED CHARS: t, r, s, t, c, l, b, n, q
  'g,i,n': 'clickLoginButton',
  // NAVIGATION bar ##############################
  's,c': 'syncClub',
  'h': 'goBack',
  'r,t': 'navigateHome',
  's,q': 'navigateSquads',
  's,b,c': 'navigateSbc',
  't,r': 'navigateTransfers',
  's,t': 'navigateStadium',
  's,o': 'navigateStore',
  'c,l': 'navigateClub',
  'l,r': 'navigateLeaderboards',
  's,s': 'navigateSettings',
  // TRANSFERS tab ##############################
  't,m': 'clickTransferMarketTile',
  't,l': 'clickTransferListTile',
  't,t': 'clickTransferTargetsTile',
  // CLUB tab ##############################
  'p,l': 'clickPlayersTile',
  // SEARCH THE TRANSFER MARKET ##############################
  'p,n': 'focusPlayerNameInput',
  'b,m': 'focusBidPriceMin',
  'b,x': 'focusBidPriceMax',
  'n,m': 'focusBuyNowPriceMin',
  'n,x': 'focusBuyNowPriceMax',
  'e': 'clickSearchTransferMarketButton',
  'y': 'clickBuyNow',
  's,b,q': 'setBronzeQuality',
  's,s,q': 'setSilverQuality',
  's,g,q': 'setGoldQuality',
  's,r,r': 'setRareRarity',
  's,r,c': 'setCommonRarity',
  // TRANSFER LIST  ##############################
  'c,s': 'clearSoldItems',
  'r,a': 'reListAll',
  'q,s': 'quickSell',
  'a,p': 'addPlayer',
  's,t,l': 'sendToTransferList',
  's,m,c': 'clickSendToMyClubButton',
  // Navigate on player items list
  'j': 'nextPlayer',
  'k': 'previousPlayer',
  // LISTING on Transfer Market
  'b,r,l': 'bronzeRareList',
  'b,c,l': 'bronzeCommonList',
  's,r,l': 'silverRareList',
  'c,p,l': 'customPriceList',
  // Club search
  ';,b,r': 'clubSearchBronzeRarePlayerItems',
  ';,b,c': 'clubSearchBronzeCommonPlayerItems',
  ';,s,r': 'clubSearchSilverRarePlayerItems',
  ';,s,c': 'clubSearchSilverCommonPlayerItems',
  ';,g,r': 'clubSearchGoldRarePlayerItems',
  ';,g,c': 'clubSearchGoldCommonPlayerItems',
} as Record<string, string>

export type BindingsKeys = keyof typeof keyMap
export type Bindings = typeof keyMap extends Record<BindingsKeys, infer T>
  ? T
  : never

export const commandsKeys = Object.values(keyMap)
