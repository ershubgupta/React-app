// import {CartType, IStateType} from "./Types";
// import { AnyAction } from "redux";

// // interface ADD_TO_CART {
// //   type: CartType;
// //   payload: {
// //     productId: string,
// //     productQuantity: number
// //   }
// //   // ADD: number
// // }

// // interface REMOVE_FROM_CART {
// //   type: CartType;
// //   payload: {
// //     productId: string;
// //     productQuantity: number;
// //   };
// // }

// // type Action = ADD_TO_CART;

// // interface userCart {
// //   productId: string;
// //   productQuantity: number;
// // }

// const initialState: IStateType = {
//   cartItemCount: 0,
//   cartItem: [],
// };
// console.log("initialState: ", initialState);

// const cartReducer = (
//   state: IStateType = initialState,
//   action: AnyAction
// ): IStateType => {
//   const currCartItem = state.cartItem.find((item) => (item.productId === action.payload.productId));
//   switch (action.type) {
//     case CartType.ADD:
//       return {
//         ...state,
//         cartItem: [
//           ...state.cartItem.filter(
//             (item) => item.productId !== action.payload.productId
//           ),
//           {
//             productId: action.payload.productId,
//             productQuantity: currCartItem
//               ? currCartItem.productQuantity + 1
//               : 1,
//           },
//         ],
//       };
//     case CartType.REMOVE:
//       return {
//         ...state,
//         cartItem: [
//           ...state.cartItem.filter(
//             (item) =>
//               // item.productQuantity !== 0 ||
//               item.productId !== action.payload.productId
//           ),
//           {
//             productId: action.payload.productId,
//             productQuantity: currCartItem?.productQuantity
//               ? currCartItem.productQuantity - 1
//               : 0,
//           },
//         ],
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;
import React from 'react'

function CartReducer() {
  return (
    <div>CartReducer--</div>
  )
}

export default CartReducer