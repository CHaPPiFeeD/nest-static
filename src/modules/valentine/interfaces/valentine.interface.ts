export interface IAddKeyValentineInterface {
  key: string;
  puzzle: string;
}

export interface IGetOpenedChankInterface {
  puzzle: string;
}

export interface IOpenedChankRestonseInterface {
  isOpened: boolean;
  openedChanks: { row: number; column: number }[];
  fullImageUrl?: string;
  moneySum?: number;
}
