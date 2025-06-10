'use client'
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { postsStore, state } from "./_redux/store";
import { getPosts } from "./_redux/postsSlice";
import PostDetails from "./_postDetails/page";
import Cooke from 'js-cookie'

export default function Home() {
  const router=useRouter()
 const[loading,setLoading]= useState(true)

const {isLoading,posts}= useSelector((store:state)=>store.postReducer)
const dispatch = useDispatch<postsStore>()

  useEffect(()=>{
    if(!Cooke.get('token')){
        router.push('/login')
    }else{
      setLoading(false)
      dispatch(getPosts())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return <>
  {loading ||isLoading ? <Loading/>:posts?.map((post)=><PostDetails key={post.id} post={post} />)}

    
  
  
  </>
}
