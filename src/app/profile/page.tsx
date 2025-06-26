'use client'

import { useDispatch, useSelector } from "react-redux"
import { postsStore, state } from "../_redux/store"
import { jwtDecode } from 'jwt-decode'
import Loading from "../loading"
import { useEffect, useState } from "react"
import { getUserPosts } from "../_redux/postsSlice"
import PostDetails from "../_postDetails/page"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"

interface TokenPayload {
  user: undefined;
  // أي حقول أخرى في التوكن
}

export default function ProfilePage() {  // تغيير اسم الدالة لتصبح واضحة
  const router = useRouter()
  const [isValidToken, setIsValidToken] = useState(false)
  const { isLoading, posts } = useSelector((store: state) => store.postReducer)
  const dispatch = useDispatch<postsStore>()

  useEffect(() => {
    const token = Cookies.get('token')
    
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token)
      
      if (!decoded.user) {
        throw new Error('Invalid token structure')
      }
      
      setIsValidToken(true)
      dispatch(getUserPosts(decoded.user))
      // يجب أن يطبع "string"

    } catch (error) {
      console.error('Token error:', error)
      Cookies.remove('token')
      router.push('/login')
    }
  }, [dispatch, router])

  if (!isValidToken) {
    return <Loading />
  }

  return (
    <div className="profile-container"> {/* أضف عنصر غلاف رئيسي */}
      {isLoading ? (
        <Loading />
      ) : (
        posts?.map((post) => (
          <PostDetails key={post.id} post={post} isComment={true} />
        ))
      )}
    </div>
  )
}