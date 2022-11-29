import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

import Title from './Title';
import { AppBar, Drawer } from './styled';

const Dashboard = () => {
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(true);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken'));
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setAuthenticated(true);
      axios({
        method: "GET",
        url: 'http://localhost:5000/exam-results',
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }).then(res => setScore(res.data[0].score))

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
      
    }

  }, [authenticated])

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  }

  return (
    authenticated ? (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                  }}
                >
                  {
                    score ? (
                      <React.Fragment>
                    <Title>Exam results</Title>
                    <Typography color="text.secondary">
                      your score is:
                    </Typography>
                    <Typography component="p" variant="h4">
                      {score} of 10
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                      PASSED
                    </Typography>
                  </React.Fragment>
                    ) : (
                      <Typography> Sorry, you have no exam scores yet...</Typography>
                    )
                  }
                  
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    ) : (
      <Navigate replace to={'/signin'} />
    )
  );
}

export default Dashboard;