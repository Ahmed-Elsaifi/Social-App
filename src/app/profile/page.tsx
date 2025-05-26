'use client'
import { useDispatch, useSelector } from "react-redux"
import { postsStore, state } from "../_redux/store"
import {jwtDecode} from 'jwt-decode'
import Loading from "../loading"
import { useEffect } from "react"
import { getUserPosts } from "../_redux/postsSlice"
import PostDetails from "../_postDetails/page"

export default function Profile() {


   

  const {isLoading,posts}=  useSelector((store:state)=>store.postReducer)
  const dispatch= useDispatch<postsStore>()
  const x =jwtDecode(`${localStorage.getItem('token')}`)
  useEffect(()=>{
    dispatch(getUserPosts(x.user))
  },[])

  return <>
    {isLoading?<Loading/>:posts.map((post)=><PostDetails key={post.id} post={post} isComment={true} />)}
  
  
  
  </>
}