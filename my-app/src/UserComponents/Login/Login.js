import React, { useEffect, useState } from 'react'
// import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { FormControl, Alert, Collapse } from '@mui/material'
import axios from 'axios'
import {useNavigate }from 'react-router-dom'
import '../Login/Login.css'
import {_URL} from '../../url.js'
const Login = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pass, setPass] = useState(false)
  const [err, setErr] = useState(false)

  let navigate = useNavigate()
  useEffect(() => {

  }, [err, password, username])

  const updatePassword = (e) =>{
    setPassword(e.target.value)
  }

  const updateUsername = (e) =>{
    setUsername(e.target.value)
  }

  const submit = async () => {
    
    const body ={
      username: username,
      password: password
    }

    // await axios.post('https://brilliantpro-backend.herokuapp.com/Learners/login', body).then(res => {
    //   console.log('res data password', res.data[0].password)
    //   console.log('res data username', res.data[0].username)
    //   console.log('res data id', res.data[0]._id)
    //   setUser(res.data[0])

    //   if (body.password === res.data[0].password && body.username === res.data[0].username){
    //     console.log('here')
    //     setPass(true)
    //   }
    //   // else{
    //   //   setPass(false)
    //   // }
    //   console.log('pass', pass)
    //   if (pass === true){
    //     //window.location = 'http://localhost:3000/' + res.data[0]._id
    //     navigate('/'+ res.data[0]._id)
    //   }
    //   console.log('userid', user._id)
    // })

    const res = await axios.post(_URL + 'Learners/login', {username: username, password: password})
    console.log('res', res.data)
    if (res.data.length != 0 && password === res.data[0].password && username === res.data[0].username){
      console.log('hereherhereh')
      setPass(true)
      setErr(false)
      console.log(pass)
      navigate('/'+ res.data[0]._id)
    }
    else{
      setErr(true)
      console.log('was here')
    }
    

    // if (user.length === 1 && user.username === username && user.password === password){
    //   document.getElementById('show').innerHTML = <Link to={'/:UserID'}><Button variant='outlined'> Go to Home </Button></Link>
    // }

    // else {
    //   return(
    //     document.getElementById('show').innerHTML = <Typography variant='body1'>Try Again</Typography>
    //   )
    // } 
  }


  return (
    <>
      <Grid className='container' container direction="column" justifyContent="center" alignItems="center">
        <Button><Link to='/Signup'>Sign Up</Link></Button>
        <Typography variant="h4" gutterBottom component="div">Login</Typography>
        <FormControl maxWidth>
          <TextField id="filled-basic" label="Username" variant="filled" onChange={updateUsername}></TextField>
          <TextField id="filled-basic" label="Password" variant="filled" type='password' onChange={updatePassword}></TextField>
          <Button variant="contained" onClick={submit}>Login</Button>
          <div id='show'></div>
        </FormControl>
        <Collapse in={err} style={{marginTop: '1%'}}>
          <Alert sx={{ mb: 2 }} severity='error'>
          No matching user. Please try again.  
          </Alert>
        </Collapse>
    </Grid>
 
    </>
  )
}

export default Login
