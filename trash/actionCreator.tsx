import {CartType} from "./Types";

export const ADD = (productId: number) => {
  return {
    type: CartType.ADD,
    payload: {
      productId,
      // productQuantity,
    },
  };
};

export const REMOVE = (productId: number) => {
  return {
    type: CartType.REMOVE,
    payload: {
      productId,
      // productQuantity,
    },
  };
};