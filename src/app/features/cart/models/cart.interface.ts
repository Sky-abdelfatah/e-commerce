export interface Cart {
  _id: string;
  cartOwner: string;
  products: ProductElement[];
  createdAt: Date;
  updatedAt: Date;
  totalCartPrice: number;
}
export interface ProductElement {
  _: string;
  count: number;
  product: ProductProduct;
  price: number;
}
export interface ProductProduct {
  subcategory: string;
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
}
