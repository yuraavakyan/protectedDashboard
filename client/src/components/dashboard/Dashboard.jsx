import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import { Box, Button, Card, Container, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({})
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    axios({
      method: "GET",
      url: 'http://localhost:5001/posts',
      headers: 'Content-Type: application/json',
    }).then(res => setPosts(res.data))

    //       axios({
    //   method: "POST",
    //   url: 'http://localhost:5000/exam-results',
    //   // headers: {
    //   //   authorization: `Bearer ${accessToken}`
    //   // },
    //   data: {
    //     userId: '63860f9f70007d5bd815004c',
    //     score: 8
    //   }
    // }).then(res => setScore(res.data[0].score))

  }, [newPost])

  const handleSubmit = (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      axios({
        method: 'POST',
        url: 'http://localhost:5001/posts',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        data: {
          post: data.get('post'),
        },
      }).then(res => {
        setNewPost(res)
        data.set('post', '')
      }).catch((e) => console.error(e));
    }
  };

  const handleDelete = (id) => {
    const accessToken = localStorage.getItem('accessToken')
    axios({
      method: 'DELETE',
      url: 'http://localhost:5001/posts',
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      data: { id },
    }).then((res) => setNewPost(res)).catch(e => console.error(e))
  }

  const currentUser = localStorage.getItem('userId');

  return (
    authenticated ? (
      <Container sx={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '10px',
          padding: '40px 60px'
        }
      }>
        {
          posts && posts.map(post => (
            <Card key={post._id} sx={{ padding: '5px 15px', borderRadius: '5px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Typography sx={{ fontSize: '12px', color: '#a96ea9' }}>{post.author ? post.author.firstName : 'hidden user'}</Typography>
                <Typography variant='h6'>{post.post}</Typography>
              </div>
              {currentUser === post.author?._id && <DeleteIcon onClick={() => handleDelete(post._id)} />}
            </Card>
          ))
        }
        <Box component={'form'} onSubmit={handleSubmit}>
          <TextField
            id='post'
            label='Post'
            name='post'
          />
          <Button variant='contained' type={'submit'}>Publish</Button>
        </Box>
      </Container>
    ) : (
      <Navigate replace to={'/signin'} />
    )
  );
}

export default Dashboard;