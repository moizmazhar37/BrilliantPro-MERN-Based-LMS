import React from 'react'
// import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { FormControl } from '@mui/material'
import './Login.css'

const Login = () => {
  return (
    <>
      <Grid className='container' container direction="column" justifyContent="center" alignItems="center">
        <Button><Link to='/Signup'>Sign Up</Link></Button>
        <Typography variant="h4" gutterBottom component="div">Login</Typography>
        <FormControl maxWidth>
          <TextField id="filled-basic" label="E-mail" variant="filled"></TextField>
          <TextField id="filled-basic" label="Password" variant="filled" type='password'></TextField>
          <Button variant="contained">Login</Button>
        </FormControl>
    </Grid>
    </>
  )
}

export default Login
