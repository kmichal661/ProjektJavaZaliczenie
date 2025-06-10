export interface IImage {
  id: number;
  url: string;
  fileName: string;
}

export interface IOffer {
  address: string;
  description: string;
  id: number;
  listingDate?: string;
  numberOfBathrooms?: number;
  numberOfBedrooms?: number;
  price: number;
  squareMeters?: number;
  title: string;
  images?: IImage[];
  phoneNumber?: string;
}
