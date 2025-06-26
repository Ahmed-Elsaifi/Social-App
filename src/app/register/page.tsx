'use client'     
import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import {useFormik} from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { state } from "../_redux/store";
import { setError, setLoding} from "../_redux/auhtSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




export default function Register() {

    const dispatch=useDispatch()
    const router =useRouter()
    const {isLoding}= useSelector((store:state)=>store.authReducer)

 async function register (values:{name:string ,email:string,password:string,rePassword:string,dateOfBirth:string,gender:string}){
    console.log(values,'values');
     dispatch(setLoding())
   
    
    const response=await fetch(`https://linked-posts.routemisr.com/users/signup`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-type':'application/json'
      }
    })
    const data =await response.json()
    console.log(data,'datatatatata');
    
    if (response.ok) {
      toast.success('sueccss')
      
      
      router.push('/login')
    
    }else{
      dispatch(setError(data.error))
    }

    
    
   } 
    

  

 const{handleChange,handleSubmit ,values}= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:''

    },
    onSubmit:register
  })

  return <>

  <Paper elevation={7} sx={{p:2 ,m: 3,textAlign:'center'}}>
    <h2>Register Page </h2>
    <form onSubmit={handleSubmit} style={{display:'flex' ,flexDirection:'column',gap:'1.5rem',padding:'1.2rem'}} >


    <TextField onChange={handleChange} value={values.name} id="name" label="name"   type="text" variant="standard" />
    <TextField onChange={handleChange} value={values.email} id="email" label="Email" type="email" variant="standard" />
    <TextField onChange={handleChange} value={values.password} id="password" label="password"   type="password" variant="standard" />
    <TextField onChange={handleChange} value={values.rePassword} id="rePassword" label="rePassword"   type="password" variant="standard" />
    <TextField onChange={handleChange} value={values.dateOfBirth} id="dateOfBirth" label="dateOfBirth"   type="number" variant="standard" />
    <TextField onChange={handleChange} value={values.gender} id="gender" label="gender"   type="text" variant="standard" />
    <Button disabled={isLoding==true} variant="contained" type="submit">{isLoding?<CircularProgress size={40} />:'Register'}</Button>


  </form>

  </Paper>
  
  
  
  </>
}
