
 import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Comment, Post } from '../interfaces';
import Image from 'next/image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import Cooke from 'js-cookie'


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostDetails({post,isComment=false}:{post:Post, isComment?:boolean}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 const [comments,setComments]= React.useState([])
  async function handleComment(e:React.FormEvent) {
    e.preventDefault();
    const form =e.target as HTMLFormElement;
    
    const values= {
      content:form.comment.value,
      post:post.id
    }
    const response =await fetch(`https://linked-posts.routemisr.com/comments`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        token:Cooke.get('token')||'',
        'Content-type':'application/json'
      }
    })
    const data=await response.json()
    console.log(data);
    setComments(data.comments)
    form.comment.value=null
    
    
    
  }

  return (
    <Card sx={{ m:2 } }elevation={7}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          <Image src={post.user.photo} alt={post.user.name} width={60} height={60} style={{width:'100%',height:'auto'}} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split('T',1)}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
      </CardContent>
     {post.image && <Image src={post.image} alt={`${post.body}`} width={400} height={300} style={{width:'100%',objectFit:'cover'}}  />}


      
      <CardActions sx={{width:'70%',mx:'auto',display:'flex',justifyContent:'space-between'}} >
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

      {post.comments.length>0 &&isComment==false?
      <CardContent sx={{backgroundColor:'#eee',my:2}}>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {!post.comments[0].commentCreator.photo.includes('undefined')?
            <Image src={post.comments[0].commentCreator.photo} alt={post.comments[0].commentCreator.name} width={60} height={60} style={{width:'100%',height:'auto'}} />:
            post.comments[0].commentCreator.name.slice(0,1)}
          
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.comments[0].commentCreator.name}
        subheader={post.comments[0].createdAt.split('T',1)}
      />
          <Typography sx={{ marginBottom: 2 ,width:'80%',mx:'auto'}}>
            {post.comments[0].content}
          </Typography>
          <Link style={{color:'#1976D2',display:'block',textAlign:'right'}} href={`/singlePost/${post.id}`} >View All Comments</Link>
        
        </CardContent>
        :post.comments.length>comments.length && isComment  ? post.comments.map((comment:Comment)=><CardContent key={comment._id} sx={{backgroundColor:'#eee',my:2}}>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {!comment.commentCreator.photo.includes('undefined')?
            <Image src={post.comments[0].commentCreator.photo} alt={comment.commentCreator.name} width={60} height={60} style={{width:'100%',height:'auto'}} />:
            comment.commentCreator.name.slice(0,1)}
          
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.createdAt.split('T',1)}
      />
          <Typography sx={{ marginBottom: 2 ,width:'80%',mx:'auto'}}>
            {comment.content}
          </Typography>
         
        
        </CardContent>)
       
        :comments.map((comment:Comment)=><CardContent key={comment._id} sx={{backgroundColor:'#eee',my:2}}>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {!comment.commentCreator.photo.includes('undefined')?
            <Image src={post.comments[0].commentCreator.photo} alt={comment.commentCreator.name} width={60} height={60} style={{width:'100%',height:'auto'}} />:
            comment.commentCreator.name.slice(0,1)}
          
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.createdAt.split('T',1)}
      />
          <Typography sx={{ marginBottom: 2 ,width:'80%',mx:'auto'}}>
            {comment.content}
          </Typography>
        
        
        </CardContent>)}
        
      <form onSubmit={(e)=>handleComment(e)} style={{display:'flex',justifyContent:'space-between',gap:4}}>
        <TextField name="comment "  id="comment" label="your Comment" type="text" variant="outlined"sx={{flexGrow:1}} />
             <Button  variant="contained" type="submit">Add Comment</Button>
      </form>
      </Collapse>
       
       
    </Card>
      );
}
