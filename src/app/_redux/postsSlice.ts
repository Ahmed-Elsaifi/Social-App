
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Post } from "../interfaces"
import Cooke from 'js-cookie'

const initialState ={
    
    isLoading:false as boolean ,
    posts:[] as Post[],
    post:null as Post |null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error:null as any

} 
const token =Cooke.get('token')
 

export    const getPosts=createAsyncThunk('posts/getPosts', async ()=>{



      const response= await fetch(`https://linked-posts.routemisr.com/posts?limit=50`,
        {
          method:'GET',
          headers:{
            token:token||'',
            'Content-type':'application/json'
          }
        }
      )
      const data=await response.json()
      console.log(data);
      return data.posts
      

    })
export    const getUserPosts=createAsyncThunk('posts/getUserPosts', async (userId)=>{

      const response= await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts?`,
        {
          method:'GET',
          headers:{
            token:Cooke.get('token')||'',
            'Content-type':'application/json'
          }
        }
      )
      const data=await response.json()
      console.log(data);
      return data.posts
      

    })
export    const getPost=createAsyncThunk('posts/getPost', async (postId:string )=>{

      const response= await fetch(`https://linked-posts.routemisr.com/posts/${postId}`,
        {
          method:'GET',
          headers:{
            token:Cooke.get('token')||'',
            'Content-type':'application/json'
          }
        }
      )
      const data=await response.json()
      console.log(data);
      return data.post
      

    })



const postSlice =createSlice({
  name:'posts',
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder.addCase(getPosts.pending,(state)=>{
     state.isLoading=true
    })
    builder.addCase(getPosts.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.posts=action.payload;
    })
    builder.addCase(getPosts.rejected,(state,action)=>{
      state.isLoading=false;
      state.error=action.payload;
    })
    builder.addCase(getUserPosts.pending,(state)=>{
     state.isLoading=true
    })
    builder.addCase(getUserPosts.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.posts=action.payload;
    })
    builder.addCase(getUserPosts.rejected,(state,action)=>{
      state.isLoading=false;
      state.error=action.payload;
    })
    builder.addCase(getPost.pending,(state)=>{
     state.isLoading=true
    })
    builder.addCase(getPost.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.post=action.payload;
    })
    builder.addCase(getPost.rejected,(state,action)=>{
      state.isLoading=false;
      state.error=action.payload;
    })
  },
}) 

export const postReducer=postSlice.reducer