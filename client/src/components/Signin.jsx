import React, {useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme();

const SignIn = () => {
  const [loggedin, setLoggedin] = useState(false)
  const [validationError, setValidationError] = useState()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
      axios({
        method: 'POST',
        url: 'http://localhost:5000/users/login',
        headers: 'Content-Type: application/json',
        data: {
          username: data.get('email'),
          password: data.get('password'),
        },
      }).then(res => {
          localStorage.setItem("accessToken", res?.data?.accessToken);
          setLoggedin(true)
      }).catch((e) => setValidationError(e.response?.data));
  };

  return (
    !loggedin ? (
      <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Typography >{validationError}</Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={!!validationError}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!validationError}
              helperText={validationError}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Typography>
              Don't have an account? <Link to={'/signup'}>SignUp</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    ) : (
      <Navigate replace to={'/dashboard'}/>
    )
  );
};

export default SignIn;
