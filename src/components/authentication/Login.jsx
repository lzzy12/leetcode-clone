import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Link } from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/configs'
import { AuthenticationTokenContext } from '../../contexts/AuthenticationToken'

function LoginPage() {
  const {setToken} = useContext(AuthenticationTokenContext);
  
  useEffect(() => onAuthStateChanged(auth, user => {
    if (!user) return setToken(null);
    user.getIdToken().then((token) => {
      console.log(token);
      setToken(token);
    });
  }), [])
  const onGoogleLogin = async () => {
    try{
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider);
    } catch(e){
      console.log(e);
    }
    
  }
  return (
    <Box
    sx={{ position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderWidth: 1,
            borderStyle: 'solid',
            p: 4,
            width: '35%',
        }}
>
  <Typography variant='h5' sx={{}}>Sign in to</Typography>
  <Typography variant='h6'>LazyCode</Typography>
  <Typography variant='h6' sx={{mb: 4}}>Login to use our free resources</Typography>
  <GoogleLoginButton onClick={onGoogleLogin} />
  <Box sx={{mb: 2}}/>
  <FacebookLoginButton />
  <Box sx={{mb: 2}}/>
  <TwitterLoginButton></TwitterLoginButton>
  </Box>
  )
}

export default LoginPage