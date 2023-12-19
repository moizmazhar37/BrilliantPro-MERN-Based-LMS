import React from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Typography } from '@mui/material'
import { FormControl } from '@mui/material'
import { Link } from 'react-router-dom'
import '../Signup/Signup.css'

const Signup = () => {
  return (        
    <Grid className='container' container direction="column" justifyContent="center" alignItems="center">
        <Button><Link to='/Login'>Login</Link></Button>
        <Typography variant="h4" gutterBottom component="div">Sign Up</Typography>
        <FormControl maxWidth>
        <TextField id="filled-basic" label="Name" variant="filled"></TextField>
        <Select labelId="demo-simple-select-label" id='role' variant='filled'>
            <MenuItem value={'L'}>Learner</MenuItem>
            <MenuItem value={'A'}>Admin</MenuItem>
        </Select>
        <TextField id="filled-basic" label="E-mail" variant="filled"></TextField>
        <TextField id="filled-basic" label="Password" variant="filled" type='password'></TextField>
        <Button variant="contained">Signup</Button>
        </FormControl>
        
    </Grid>
  )
}

export default Signup