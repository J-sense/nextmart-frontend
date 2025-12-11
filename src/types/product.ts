export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;

  price: number;
  offerPrice: number | null;

  stock: number;
  weight: number;

  availableColors: string[];
  keyFeatures: string[];
  imageUrls: string[];

  averageRating: number;
  ratingCount: number;

  brand: {
    _id: string;
    name: string;
  };

  category: {
    _id: string;
    name: string;
  };

  shop: {
    _id: string;
    shopName: string;
  };

  specification: Record<string, string>;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
