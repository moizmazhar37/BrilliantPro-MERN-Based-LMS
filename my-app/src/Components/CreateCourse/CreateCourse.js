import React, { Component } from 'react'
import { FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Typography, Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './CreateCourse.css'

export class CreateCourse extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      enrollment_link: "",
      thumbnail_image: "",
      material: "",
      material_filename: "",
      thumbnail_filename: "",
      start_date: "",
      end_date: "",
      certificate: "",
      success_open: false,
      error_open: false
      
    }
    this.url = `http://localhost:4000/Courses/add`

  }
  componentDidUpdate() {
    window.scrollTo(0, 0)
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
  
  saveThumbnail = (e) => {
    this.state.thumbnail_image = e.target.files[0]
    this.state.thumbnail_filename = e.target.files[0].name
    document.getElementById('thumbnail').innerHTML = this.state.thumbnail_filename
  }

  saveMaterial = (e) => {
    this.state.material = e.target.files[0]
    this.state.material_filename = e.target.files[0].name
    document.getElementById('material').innerHTML = this.state.material_filename
  }

  
  saveCertificate = (e) => {
    this.state.certificate = e.target.files[0]
    document.getElementById('certificate').innerHTML = this.state.certificate.name
  }

  saveStartDate = (e) => {
    this.state.start_date = e.target.value
  }
  
  saveEndDate = (e) => {
    this.state.end_date = e.target.value
  }
  
  submitData =  () => {
    // let formData = new FormData()
    // await formData.append("newcourse", this.state)
    // formData.getAll("newcourse", (item) => {
    //   console.log(item)

    // console.log(this.state.description)
    // console.log(this.state.end_date)
    // console.log(this.state.start_date)
    // console.log(this.state.start_date)
    // console.log(this.state.material)
    // console.log(this.state.material_filename)
    //checking if all the fields have been filled
    var form_is_complete = true
    if (this.state.name === "" || this.state.description === "" || this.state.certificate === "" || this.state.enrollment_link === "" || this.state.start_date === "" || this.state.end_date === "" || this.state.thumbnail_image === "" || this.state.material === ""){
      form_is_complete = false
      this.state.success_open = false
      this.state.error_open = true
      console.log('I am here', this.state.error_open)
      this.forceUpdate()
    } 

    if(form_is_complete){

      const formData= new FormData()
      formData.append("files", this.state.material)
      formData.append("files", this.state.thumbnail_image)
      formData.append("files", this.state.certificate)
      formData.append("file_names", this.state.material_filename)
      formData.append("files", this.state.thumbnail_filename)
      formData.append("name", this.state.name)
      formData.append("description", this.state.description)
      formData.append("enrollment_link", this.state.enrollment_link)
      formData.append("start_date", this.state.start_date)
      formData.append("end_date", this.state.end_date)
      for (let [key, value] of formData.entries()) { 
        console.log(key, value);
      }
      // const new_course = {
      //   name: this.state.name,
      //   description: this.state.description,
      //   enrollment_link: this.state.enrollment_link,
      //   thumbnail_image: this.state.thumbnail_image,
      //   material: this.state.material,
      //   start_date: this.state.start_date,
      //   end_date: this.state.end_date,
      //   thumbnail_filename: this.state.thumbnail_filename
      // }
      axios.post(this.url, formData).then(res => {
        this.state.success_open = true
        this.state.error_open = false
        console.log(res)
        console.log(res.data)
        window.scrollTo(0, 0)
      }).then(() => {this.forceUpdate()
      }).catch(err => console.log('This is the create course response error',err))

    }
    
  }

  render() {
    return (
      <>
       <Collapse in={this.state.success_open}>
        <Alert 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.state.success_open = false
                this.forceUpdate()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Course Created Successfully.
        </Alert>
      </Collapse>
      <Collapse in={this.state.error_open}>
        <Alert severity='error' 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.state.error_open = false
                this.forceUpdate()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Error! Please fill all the fields before submitting.
        </Alert>
      </Collapse>
      <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
          <Typography variant='h5' style={{textAlign:'center', paddingTop: '2%', paddingBottom: '2%'}}>Create Course</Typography>
          <TextField id="outlined-basic" label="Name" variant="outlined" onChange={this.saveName}></TextField>
          <TextField id="outlined-basic" label="Description" variant="outlined" multiline onChange={this.saveDescription}></TextField>
          <TextField id="outlined-basic" label="Enrollment Link" variant="outlined" multiline onChange={this.saveEnrollmentLink}></TextField>
          <input id="startDate" class="form-control" type="date" onChange={this.saveStartDate}/>
          <input id="endDate" class="form-control" type="date" onChange={this.saveEndDate}/>
          <Button variant="outlined" component="label">Upload Thumbnail Image<input type="file" hidden onChange={this.saveThumbnail}/></Button>
          <Typography variant='body2' id='thumbnail' style={{textAlign:'center', marginBottom:"1%", color:"#1976d2"}}>No file Attached</Typography>
          <Button variant="outlined" component="label">Upload Material<input type="file" hidden onChange={this.saveMaterial}/></Button>
          <Typography variant='body2' id='material' style={{textAlign:'center', marginBottom:"1%", color:"#1976d2"}}>No file Attached</Typography>
          <Button variant="outlined" component="label">Upload Course Certificate<input type="file" hidden onChange={this.saveCertificate}/></Button>
          <Typography variant='body2' id='certificate' style={{textAlign:'center', marginBottom:"1%", color:"#1976d2"}}>No file Attached</Typography>
          <Button variant="contained" onClick={this.submitData} style={{marginBottom:"2%"}}>Create</Button>
      </FormControl>    
      </>
    )
  }
}

export default CreateCourse





// const CreateCourse = () => {

//   function submitData(){
//     let createCourseForm = document.getElementById('myForm')
//     let formData = new FormData(createCourseForm)
//     console.log(formData)
//   }

//   return (
//     <>
//     <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
//         <Typography variant='h5' style={{textAlign:'center', paddingTop: '2%', paddingBottom: '2%'}}>Create Course</Typography>
//         <TextField id="outlined-basic" label="Name" variant="outlined"></TextField>
//         <TextField id="outlined-basic" label="Description" variant="outlined" multiline></TextField>
//         <TextField id="outlined-basic" label="Enrollment Link" variant="outlined" multiline></TextField>
//         <input id="startDate" class="form-control" type="date"/>
//         <input id="endDate" class="form-control" type="date"/>
//         <Button variant="outlined" component="label">Upload Thumbnail Image<input type="file" hidden/></Button>
//         <Button variant="outlined" component="label">Upload Material<input type="file" hidden/></Button>
//         <Button variant="contained" onClick={submitData}>Create</Button>
//     </FormControl>    
//     </>
//   )
// }

// export default CreateCourse