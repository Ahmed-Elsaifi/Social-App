'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { postsStore, state } from "./_redux/store";
import { getPosts } from "./_redux/postsSlice";
import PostDetails from "./_postDetails/page";

export default function Home() {
  const router=useRouter()
 const[loading,setLoading]= useState(true)

const {isLoading,posts}= useSelector((store:state)=>store.postReducer)
const dispatch = useDispatch<postsStore>()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
        router.push('/login')
    }else{
      setLoading(false)
      dispatch(getPosts())
    }
  },[])
  return <>
  {loading ||isLoading ? <Loading/>:posts.map((post)=><PostDetails key={post.id} post={post} />)}

    
  
  
  </>
}
