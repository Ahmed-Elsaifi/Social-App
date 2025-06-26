
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auhtSlice";
import { postReducer } from "./postsSlice";

export const store =configureStore({
  reducer:{
    authReducer,
    postReducer

  }
})
export type state=  ReturnType < typeof store.getState>
export type postsStore= typeof store.dispatch