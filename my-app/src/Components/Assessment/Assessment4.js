import React from 'react'

import { useParams } from 'react-router-dom'
import { Typography, Paper } from '@mui/material'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {_URL} from '../../url.js'


const Assessment = () => {
    const { CourseID } = useParams()
    const { AssessmentID } = useParams()
    const [ assessment, setAssessment ] = useState({})
    const [questions, setQuestions] = useState([])
    // var assessment = {}
    // var questions = []

    const url = _URL + 'Courses/'+ CourseID + '/Assessments/' + AssessmentID
    const url2 = _URL + 'Courses/'+ CourseID + '/Assessments/' + AssessmentID + '/qs'
    
    useEffect(() => {
        axios.get(url).then(res => {
            console.log('This is the respose data', res.data)
            setAssessment(res.data)
            //assessment = res.data
            console.log(assessment)
        }).catch(err => console.log(err))

        axios.get(url2).then(res => {
            console.log('This is the respose data', res.data)
            setQuestions(res.data)
            //question = res.data
            console.log('questions', questions)
        }).catch(err => console.log(err))
    }, [])




    const getQuestions = () => {

        const QuestionArray = []
            
        questions.map(question => {
            QuestionArray.push(
                <>
                    <Paper style={{paddingLeft: '2%', paddingBottom: '2%', paddingTop: '2%', margin: "2% 2% 2% 2%"}}>
                        <Typography variant='body1'> Question:  {question.statement} </Typography>
                        <div style={{marginTop: '1%', marginBottom: '1%'}}>
                            <Typography variant='body1'> Option 1:  {question.options[0]} </Typography>
                            <Typography variant='body1'> Option 2:  {question.options[1]} </Typography>
                            <Typography variant='body1'> Option 3:  {question.options[2]} </Typography>
                            <Typography variant='body1'> Option 4:  {question.options[3]} </Typography>
                        </div>
                        <div>
                            <Typography variant='body1'> Correct Answer:  {question.answer} </Typography>
                        </div>
                    </Paper>
                </>
            )
        })
        return QuestionArray
    }
    
  
  return (
     <>

     <Typography variant='h4' style={{textAlign:'center', paddingTop: '2%', paddingBottom: '2%',paddingRight: '4%'}}>{assessment.name}</Typography>
     <div style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'gap': '20%'}}>
        <Typography variant='h6'>Time: {assessment.time} mins</Typography>
        <Typography variant='h6'>Passing Criteria: {assessment.passing_criteria}%</Typography>
     </div>
     {/* <Button style={{textAlign='center'}} on>View Questions</Button> */}
     <>
     {
        getQuestions()
     }   
     </> 
     </> 
  )
}

export default Assessment