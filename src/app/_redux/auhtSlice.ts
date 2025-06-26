

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Cooke from 'js-cookie'


const  initialState = { isAuth:false as boolean,token: Cooke.get('token') as string |null, isLoding: false as boolean, error: null as null | string };



const authSlice =createSlice({
  name:'auth',
  initialState,
  reducers:{
    setLoding:(state)=>{
      state.isLoding=false

    },
    setToken:(state,action)=>{
      state.isLoding=false;
      state.token=action.payload.token;
      Cooke.set('token',action.payload.token);
      toast.success(action.payload.message)

    },
    setError:(state,action)=>{
      state.isLoding=false
     state.error=action.payload
     toast.error(action.payload,{duration:2000})

    },
    removeToken:(state)=>{
      state.token=null
      Cooke.remove('token')

    }
  }
})

authSlice.getInitialState()

export const authReducer = authSlice.reducer
export const  {setError,setLoding,setToken,removeToken}=authSlice.actions