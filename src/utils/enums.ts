export enum FilterOptions {
  SortBy = 'SortBy',
  Quality = 'Quality',
  Rarity = 'Rarity',
  Special = 'Special',
}

export enum Quality {
  Special = 'Special',
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze',
}

export enum Rarity {
  Special = 'Special',
  Common = 'Common',
  Rare = 'Rare',
}

export enum SortBy {
  HighestQuickSell = 'Highest Quick Sell',
  LowestQuickSell = 'Lowest Quick Sell',
  RatingHighToLow = 'Rating High to Low',
  RatingLowToHigh = 'Rating Low to High',
  MostRecent = 'Most Recent',
}
