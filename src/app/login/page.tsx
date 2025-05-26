'use client'     
import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import {useFormik} from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { state } from "../_redux/store";
import { setError, setLoding, setToken } from "../_redux/auhtSlice";
import { useRouter } from "next/navigation";



export default function Login() {

    const dispatch=useDispatch()
    const router =useRouter()
 const {isLoding}= useSelector((store:state)=>store.authReducer)
   async function login (values:{email:string ,password:string}){


    dispatch(setLoding())
   
    
    const response=await fetch(`https://linked-posts.routemisr.com/users/signin`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-type':'application/json'
      }
    })
    const data =await response.json()
    if (response.ok) {
      router.push('/')

      dispatch(setToken(data))
    
    }else{
      dispatch(setError(data.error))
    }
    console.log(data);
    
    
   } 



 const{handleChange,handleSubmit ,values}= useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit:login
  })

  return <>

  <Paper elevation={7} sx={{p:2 ,m: 3,textAlign:'center'}}>
    <h2>Login Page </h2>
    <form onSubmit={handleSubmit} style={{display:'flex' ,flexDirection:'column',gap:'1.5rem',padding:'1.2rem'}} >


    <TextField onChange={handleChange} value={values.email} id="email" label="Email" type="email" variant="standard" />
    <TextField onChange={handleChange} value={values.password} id="password" label="password"   type="password" variant="standard" />
    <Button disabled={isLoding==true} variant="contained" type="submit">{isLoding?<CircularProgress size={40} />:'Login'}</Button>


  </form>

  </Paper>
  
  
  
  </>
}