'use client'     
import { Button,  Paper, TextField } from "@mui/material";


import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import Cooke from 'js-cookie'



export default function CreatePost() {


    const router =useRouter()



  async function handlePost(e:FormEvent){
    e.preventDefault()
    const form =e.target as HTMLFormElement
    const formData= new FormData()
    formData.append('body',form.body.value)
    formData.append('image',form.image.files[0])
     

    const response = await fetch(`https://linked-posts.routemisr.com/posts`,{
      method:'POST',
      body:formData,
      headers:{
        'token':Cooke.get('token')||'',
      }
    })
    const data= await response.json()
    toast.success(data.message)
    router.push('/profile')
    

    }






  return <>

  <Paper elevation={7} sx={{p:2 ,m: 3,textAlign:'center'}}>
    <h2>Add Your Post  </h2>
    <form onSubmit={(e)=>handlePost(e)} style={{display:'flex' ,flexDirection:'column',gap:'1.5rem',padding:'1.2rem'}} >


    <TextField name="body "  id="body" label="your body" type="text" variant="standard" />
    <TextField name="image "  id="image" label="your image"   type="file" variant="standard" />
    <Button  variant="contained" type="submit">ADD POST</Button>


  </form>

  </Paper>
  
  
  
  </>
}