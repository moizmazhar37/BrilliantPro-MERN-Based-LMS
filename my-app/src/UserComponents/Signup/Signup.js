import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { Button, Collapse, Alert } from '@mui/material'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { FormControl } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../Signup/Signup.css'
import {_URL} from '../../url.js'

const Signup = () => {
  
  const url = _URL +`Learners/Signup`
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false)

  useEffect(()=> {

  }, [success, err])

  function updateUsername(e){
    setUsername(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  function updateName(e){
    setName(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const submitData = () => {
    if (name !== '' && email !== '' && password !== '' && username !== ''){
      const formData= new FormData()
      formData.append("name", name)
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      console.log('signup form data', formData)
      for (let [key, value] of formData.entries()) { 
        console.log(key, value);
      }
      console.log('Nammmme',formData.get('name'))
      axios.post(url,formData).then(res => 
        {console.log('SIGNING UP USER RESPONSE:', res)
        console.log('SIGNING UP USER RESPONSE DATA:', res.data)
        }).then(() => {
          setSuccess(true)
          setErr(false)
        }).catch(err => console.log('SIGNING UP USER ERROR: ', err))
    }
    else{
      setSuccess(false)
      setErr(true)
    }
    
  }


  return (        
    <Grid className='container' container direction="column" justifyContent="center" alignItems="center">
         <Alert sx={{ mb: 2 }} severity="warning">
          <b>Warning!</b> Please do not use any of your actual passwords or email to sign up. <b>The password you enter will be stored directly in the database.</b> Just create a simple dummy string for  password and email to test out this application.
          </Alert>
        <Button><Link to='/Login'>Login</Link></Button>
        <Typography variant="h4" gutterBottom component="div">Sign Up</Typography>
        <FormControl maxWidth>
        <TextField id="filled-basic" label="Name" variant="filled" onChange={updateName}></TextField>
        {/* <Select labelId="demo-simple-select-label" id='role' variant='filled'>
            <MenuItem value={'L'}>Learner</MenuItem>
            <MenuItem value={'A'}>Admin</MenuItem>
        </Select> */}
        <TextField id="filled-basic" label="Username" variant="filled" onChange={updateUsername}></TextField>
        <TextField id="filled-basic" label="E-mail" variant="filled" onChange={updateEmail}></TextField>
        <TextField id="filled-basic" label="Password" variant="filled" type='password' onChange={updatePassword}></TextField>
        <Button variant="contained" onClick={submitData}>Signup</Button>
        </FormControl>
        
        <Collapse style={{marginTop:'1%'}} in={success}>
          <Alert sx={{ mb: 2 }}>
          Signed up Successfully. Now you may log in.
          </Alert>
      </Collapse>

      <Collapse in={err}>
        <Alert sx={{ mb: 2 }} severity='error'>
         Please fill all the fields correctly.
        </Alert>
      </Collapse>
      
    </Grid>
  )
}

export default Signup