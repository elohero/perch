export type Spice = {
  id: number;
  name: string;
  price: number;
  description: string;
  imagePath: string;
  weight: string;
};

export type Category = {
  id: string;
  name: string;
  spices: Spice[];
};

export enum RouterPaths {
  ROOT = '/',
  DETAILS = '/product',
  ABOUT = '/about',
  NOT_FOUND = '*',
}