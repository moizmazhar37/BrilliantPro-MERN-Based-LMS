import React, { useEffect, useState } from 'react'
import { FormControl, Typography,TextField, Button, Paper } from '@mui/material'
import CreateQuestion from '../CreateQuestion/CreateQuestion'
import '../CreateCourse/CreateCourse.css'
import axios from 'axios'
import {Alert, Collapse, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import {_URL} from '../../url.js'

const CreateAssessment = () => {

  const { CourseID } = useParams()
  const [name, setName] = useState('')
  const [passingCriteria, setPassingCriteria] = useState('')
  const [time, setTime] = useState('')
  const [questions,setQuestions] = useState([])
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')


  const AddQuestion = async (data) => {
    const Data = data
    console.log('Data', data)
    
    const tempArr = [...questions]
    tempArr.push(data)
    setQuestions(tempArr)

    //console.log('pushed.', questions)
  }

  const updateName = (e) => {
    setName(e.target.value)
  }

  const updatePassingCriteria = (e) => {
    setPassingCriteria(e.target.value)
  }

  const updateTime = (e) => {
    setTime(e.target.value)
  }


  useEffect(() => {
    console.log('Questions',questions)
  },[questions])

  useEffect(() => {
    window.scrollTo(0,0)
  },[ error, success])

  const createAssessment = async () => {
 
    if (name != '' && passingCriteria != '' && time != '' && questions.length != 0 && !isNaN(passingCriteria) && !isNaN(time)){
      console.log(questions)
      const Assessment = {
        name: name,
        passing_criteria: parseInt(passingCriteria),
        time: parseInt(time),
        questions: questions
      }
  
      await axios.put(_URL + 'Courses/' + CourseID +'/addAssessment', Assessment).then(res => console.log('putted Assessment', res)).then(() => {setSuccess(true)
      setError(false)
      }).catch(err => console.log('error', err))

    }
    else{
      setError(true)
      setSuccess(false)
    }
  }


  return (
    <>
     <Collapse in={success}>
        <Alert 
          // action={
          //   <IconButton
          //     aria-label="close"
          //     color="inherit"
          //     size="small"
          //     onClick={() => {
          //       this.state.success_open = false
          //       this.forceUpdate()
          //     }}
          //   >
          //     <CloseIcon fontSize="inherit" />
          //   </IconButton>
          // }
          sx={{ mb: 2 }}
        >
          Assessment Created Successfully
        </Alert>
      </Collapse>
      <Collapse in={error}>
        <Alert severity='error' 
          // action={
          //   <IconButton
          //     aria-label="close"
          //     color="inherit"
          //     size="small"
          //     onClick={() => {
          //       this.state.error_open = false
          //       this.forceUpdate()
          //     }}
          //   >
          //     <CloseIcon fontSize="inherit" />
          //   </IconButton>
          // }
          sx={{ mb: 2 }}
        >
          Error! Please fill all the fields correctly before submitting.
        </Alert>
      </Collapse>

      <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
      <Typography variant='h5' style={{textAlign:'center', paddingTop: '2%', paddingBottom: '2%'}}>Create Assessment</Typography>
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={updateName}></TextField>
      <TextField id="outlined-basic" label="Passing Criteria (in percentage)" variant="outlined" onChange={updatePassingCriteria}></TextField>
      <TextField id="outlined-basic" label="Time (in Minutes)" variant="outlined" onChange={updateTime}></TextField>
      <Paper>
      <Collapse in={questions.length}>
        <Alert sx={{ mb: 2 }}>
         Questions Added: {questions.length}
        </Alert>
      </Collapse>
      
      </Paper>

      <Paper style={{"paddingBottom": "4%"}}>
        <CreateQuestion callParent={AddQuestion}></CreateQuestion>
      </Paper>
      <Button variant="contained" style={{"marginBottom": "4%"}} component="label" onClick={createAssessment}>Create Assessment</Button>
    </FormControl>
    </>
    
  )
}

export default CreateAssessment