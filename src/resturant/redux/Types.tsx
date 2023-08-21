export enum CartType {
  ADD = "ADD_TO_CART",
  REMOVE = "REMOVE_FROM_CART"
}

export interface IDishDetails {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  discount?: number;
  isNonVeg: boolean;
  rating: number;
  image: string;
  quantity: number;
}

export interface IUserCart extends IDishDetails {
  productQuantity?: number;
}

export interface IStateType {
  // cartItemCount: number;
  cartItem: Array<IUserCart>
}

export interface IAddToCartButton extends IDishDetails {
  cn?: string;
}