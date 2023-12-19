import React, { Component } from 'react'
import { FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import axios from 'axios';
import '../CreateCourse/CreateCourse.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Collapse, IconButton } from '@mui/material'
import {_URL} from '../../url.js'

export default class CourseSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      enrollment_link: "",
      start_date: "",
      end_date: "",
      delete: false,
      update_success: false,
      delete_success: false,
      update_error: false
    }
    this.url1 = _URL + `Courses/`+ this.props.id
    this.url2 = _URL + `Courses/settings/update/`+ this.props.id
  }

  componentDidMount(){
    this.getCourse()
  }

  componentDidUpdate(){
    window.scrollTo(0,0)
  }

  //lets populate all the fields with their default values on Mounting.

  getCourse = async () => {
    await axios.get(this.url1).then(res => {
      
      this.setState({ name: res.data.name})
      this.setState({ description: res.data.description})
      this.setState({ enrollment_link: res.data.enrollment_link})
      this.setState({ start_date: this.extractDate(res.data.start_date)})
      this.setState({ end_date: this.extractDate(res.data.end_date)})
    }).then(() => {
      document.getElementById('name').value = this.state.name
      document.getElementById('description').value = this.state.description
      document.getElementById('enrollment_link').value = this.state.enrollment_link
      document.getElementById('start_date').value = this.state.start_date
      document.getElementById('end_date').value = this.state.end_date
    })
    console.log(this.state)
  }

 

  extractDate = (str) => {
    for (let i = 0; i < str.length; i++){
        if (str[i] === 'T')
            return str.substring(0,i)
    }
  }

  saveName = (e) => {
    this.state.name = e.target.value
  }

  saveDescription = (e) => {
    this.state.description = e.target.value
  }

  saveEnrollmentLink = (e) => {
    this.state.enrollment_link = e.target.value
  }
  
  
  openDialog = () => {
    this.state.delete = true
    this.forceUpdate()
  }
  closeDialog= () => {
    this.state.delete = false
    this.forceUpdate()
  }

  saveStartDate = (e) => {
    this.state.start_date = e.target.value
  }
  
  saveEndDate = (e) => {
    this.state.end_date = e.target.value
  }
  submitData =  () => {

    if(this.state.name != "" && this.state.description != "" && this.state.enrollment_link != "" && this.state.start_date != "" && this.state.end_date != ""){
      const body = {
        name: this.state.name,
        description: this.state.description,
        enrollment_link: this.state.enrollment_link,
        start_date: this.state.start_date,
        end_date: this.state.end_date
      }
      
      axios.put(this.url2, body).then(res => {
        console.log(res)
        console.log(res.data)
      }).then(() => {
        this.state.update_error = false
        this.state.delete_success = false
        this.state.update_success = true
        this.forceUpdate()
      }).catch(err => console.log('This is the update course response error',err))
    }
    else{
      this.state.update_error = true
      this.state.delete_success = false
      this.state.update_success = false
      this.forceUpdate()
      console.log('I am here')
    }

   
  }

  deleteCourse = () => {
    this.closeDialog()
    axios.delete(this.url1).then(res => {
      console.log(res)
      console.log(res.data)
    }).then(() => {
    this.state.update_success = false
    this.state.update_error = false
    this.state.delete_success = true
    this.forceUpdate()
    console.log('I am here')
    }).catch(err => console.log('This is the delete course response error',err))
  }
  
  render() {

  
    return (
      <>
      
      <Collapse in={this.state.update_success}>
        <Alert 
          sx={{ mb: 2 }}
        >
          Course Updated Successfully.
        </Alert>
      </Collapse>
      

      <Collapse in={this.state.delete_success}>
        <Alert 
          sx={{ mb: 2 }}
        >
          Course deleted Successfully.
        </Alert>
      </Collapse>
      
      
      <Collapse in={this.state.update_error}>
        <Alert severity='error' 
          sx={{ mb: 2 }}
        >
          Error! Please fill all the fields correctly before submitting.
        </Alert>
      </Collapse>
     
      <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
          <Typography variant='h5' style={{textAlign:'center', paddingBottom: '1%'}}>Course Settings</Typography>
       
          <TextField style={{marginBottom: '1%'}} id="name" label="New Name" variant="outlined" onChange={(e) => this.saveName(e)}></TextField>
       
          <TextField style={{marginBottom: '1%'}} id="description" label="Description"  variant="outlined" multiline onChange={this.saveDescription}></TextField>
      
          <TextField  style={{marginBottom: '1%'}} id="enrollment_link" label="Enrollment Link" variant="outlined" multiline onChange={this.saveEnrollmentLink}></TextField>
       
          <input  style={{marginBottom: '1%'}} id="start_date" class="form-control" type="date"  onChange={this.saveStartDate}/>
    
          <input  style={{marginBottom: '1%'}} id="end_date" class="form-control" type="date"  onChange={this.saveEndDate}/>
          <Button variant="contained" style={{marginTop: '1.25%'}} onClick={this.submitData}>Update Course</Button>
          <Button variant="contained" style={{ marginTop: "1%"}} color='error' onClick={this.openDialog}>Delete Course</Button>
          <div>
          

          <Dialog
            open={this.state.delete}
            onClose={this.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete the course?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete this course, it will be removed permanently and there will be no way to recover it.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} autofocus>No</Button>
              <Button onClick={this.deleteCourse}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </FormControl>    
      </>
    )
  
  }
}


