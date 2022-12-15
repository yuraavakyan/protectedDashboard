import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken'));
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setAuthenticated(false);
        navigate('/signin')
    }

    const handleLogin = () => {
        navigate('/signin')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit" onClick={authenticated ? handleLogout : handleLogin}>{authenticated ? 'Logout' : 'Login'}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar