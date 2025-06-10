'use client'
import PostDetails from "@/app/_postDetails/page"
import { getPost } from "@/app/_redux/postsSlice"
import { postsStore, state } from "@/app/_redux/store"
import Loading from "@/app/loading"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function SinglePage() {

 const{postId}= useParams()

 const {isLoading,post}= useSelector((store:state)=>store.postReducer)
 const dispatch= useDispatch<postsStore>()

 useEffect(()=>{
  dispatch(getPost(`${postId}`))
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])


  return <>
    {isLoading?<Loading/>  :post  && <PostDetails post={post} isComment={true} />}
  
  
  
  </>
}