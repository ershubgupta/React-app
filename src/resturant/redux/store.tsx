// import { configureStore } from "react-redux/es/exports";
import { configureStore } from "@reduxjs/toolkit";
// import {createStore} from "redux"
import cartSlice from "./cartSlice"

const store = configureStore({
  reducer: {
    cartReducer: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
