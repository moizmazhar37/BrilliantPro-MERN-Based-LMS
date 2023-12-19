import React, { useEffect } from 'react'
import { FormControl, Typography,TextField, Button, Select, MenuItem,InputLabel } from '@mui/material'
import '../CreateCourse/CreateCourse.css'
import { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Alert, Collapse, IconButton } from '@mui/material'

const CreateQuestion = (props) => {

  const [statement,setStatement] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [answer, setAnswer] = useState('')
  const [err, setErr] = useState(false)
  const updateAnswer = (e) => {
    setAnswer(e.target.value)
    console.log(e.target.value)
  }

  const updateOption1 = (e) => {
    setOption1(e.target.value)
  }

  const updateOption2 = (e) => {
    setOption2(e.target.value)
  }

  const updateOption3 = (e) => {
    setOption3(e.target.value)
  }

  const updateOption4 = (e) => {
    setOption4(e.target.value)
  }

  const updateStatement = (e) => {
    setStatement(e.target.value)
  }

  useEffect(() => {

  }, [err])
  const sendData = () => {
    const options = [option1, option2, option3, option4]
    if( option1 != '' && option2 != '' && option3 != '' && option4 != '' && answer != ''  && statement != ''){
      const data = {
        statement: statement,
        options: options,
        answer: answer 
      }
      setErr(false)
      console.log(data)
      props.callParent(data)
    }
    else{
      setErr(true)
    }
  }

 
  return (
    <Accordion style={{marginBottom:"3%"}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant='h6' style={{alignItems:'center',color:"#1976d2"}}><>Add Question</></Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Collapse in={err}>
        <Alert severity='error' sx={{ mb: 2 }}>
          Error! Please fill all the fields before submitting.
        </Alert>
      </Collapse>
    <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
    
      <TextField id="outlined-basic" label="Statement" variant="outlined" onChange={updateStatement}></TextField>
      <TextField id="outlined-basic" label="Option 1" variant="outlined" onChange={updateOption1}></TextField>
      <TextField id="outlined-basic" label="Option 2" variant="outlined" onChange={updateOption2}></TextField>
      <TextField id="outlined-basic" label="Option 3" variant="outlined" onChange={updateOption3}></TextField>
      <TextField id="outlined-basic" label="Option 4" style={{marginBottom:"1%"}}variant="outlined" onChange={updateOption4}></TextField>
                
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Correct Answer"
        value={answer}
        onChange={(e) => updateAnswer(e)}
      >
        <MenuItem value={option1}>{option1}</MenuItem>
        <MenuItem value={option2}>{option2}</MenuItem>
        <MenuItem value={option3}>{option3}</MenuItem>
        <MenuItem value={option4}>{option4}</MenuItem>
        
      </Select>
    </FormControl>
      <Button variant="outlined" component="label" onClick={sendData}>Add Question</Button>
    </FormControl>
    </AccordionDetails>
      </Accordion>
  )
}

export default CreateQuestion
