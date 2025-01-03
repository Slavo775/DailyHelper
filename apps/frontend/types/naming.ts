export enum NamingPurpose {
  function = 'function',
  variable = 'variable',
}

export type SuggestNamingApiQuery = {
  purpose: NamingPurpose
  description: string
}
