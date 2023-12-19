import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Link } from 'react-router-dom'
function LoginPage() {
  return (
    <Box
    sx={{ position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderWidth: 1,
            borderStyle: 'solid',
            p: 8,
            width: '25%',
        }}
>
    
    <TextField variant='outlined' label='Email' id='email' sx={{mb: 4, width: '100%', backgroundColor: 'primary.light'}}/> <br/>
    <TextField variant='outlined' label='Password' id='password' sx={{mb: 4, width: '100%', backgroundColor: 'primary.light'}}/>
    <Button variant='text' sx={{mb: 1}}><Typography variant='h6' fontSize={12} color='blue'>Forgot Password?</Typography></Button><br/>
    <Link to='/register'><Button variant='text' sx={{mb: 2}}><Typography variant='h6' fontSize={12} color='blue'>Don't have an account? Register Now</Typography></Button></Link><br/>
    <Button variant='contained'>Login</Button>
  </Box>
  )
}

export default LoginPage