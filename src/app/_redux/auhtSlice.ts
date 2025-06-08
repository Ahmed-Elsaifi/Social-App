

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState ={token: localStorage.getItem('token') as null|string ,isLoding:false as boolean ,error:null as null|string }


const authSlice =createSlice({
  name:'auth',
  initialState,
  reducers:{
    setLoding:(state)=>{
      state.isLoding=true

    },
    setToken:(state,action)=>{
      state.isLoding=false
      state.token=action.payload.token
      localStorage.setItem('token',action.payload.token)
      toast.success(action.payload.message)

    },
    setError:(state,action)=>{
      state.isLoding=false
     state.error=action.payload
     toast.error(action.payload,{duration:2000})

    },
    removeToken:(state)=>{
      state.token=null
      localStorage.removeItem('token')

    }
  }
})

authSlice.getInitialState()

export const authReducer = authSlice.reducer
export const  {setError,setLoding,setToken,removeToken}=authSlice.actions