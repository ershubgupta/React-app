import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IDishDetails, IStateType } from "./Types";

const initialState: IStateType = {
  cartItem: [],
};
console.log("initialState: ", initialState);

// const cartReducer = (
//   state: IStateType = initialState,
//   action: AnyAction
// ): IStateType => {
//   const currCartItem = state.cartItem.find(
//     (item) => item.productId === action.payload.productId
//   );
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

// const cartitem = useSelector((state:RootState) => state.cartReducer.cartItem);

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<IDishDetails>) => {
      const newState = {
        ...state,
        cartItem: [
          ...state.cartItem.filter(
            (item) => (item.id !== action.payload.id)
          ),
          ...(!!action.payload.quantity ? [action.payload] : []),
        ],
      };
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;