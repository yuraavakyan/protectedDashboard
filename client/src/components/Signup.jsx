import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const theme = createTheme();

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [validationError, setValidationError] = useState()
    const [passwordError, setPasswordError] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        axios({
            method: 'POST',
            url: 'http://localhost:5000/users/signup',
            headers: 'Content-Type: application/json',
            data: {
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                username: data.get('email'),
                password: data.get('password'),
            },
        }).then(res => {
            console.log(res.data)
        }).catch((e) => setValidationError(e.response?.data));
    };

    useEffect(() => {
        if(formData.password !== formData.repeatPassword) setPasswordError('passwords should match')
        else setPasswordError('')
    }, [formData])

    return (
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
                        Sign up
                    </Typography>
                    <Typography >{validationError}</Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='firstName'
                            label='First Name'
                            name='firstName'
                            autoComplete='firstName'
                            autoFocus
                            onBlur={(e) => setFormData({...formData, firstName: e.target.value})}
                            error={validationError}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            autoComplete='lastName'
                            error={validationError}
                            onBlur={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            error={validationError}
                            onBlur={(e) => setFormData({...formData, email: e.target.value})}

                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='Password'
                            error={passwordError}
                            helperText={validationError}
                            onBlur={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='repeatPassword'
                            label='Repeat Password'
                            type='password'
                            id='repeatPassword'
                            error={passwordError}
                            helperText={validationError}
                            onBlur={(e) => setFormData({...formData, repeatPassword: e.target.value})}

                        />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Typography>
                            Already have an account? <Link to={'/signin'}>Sign In</Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
