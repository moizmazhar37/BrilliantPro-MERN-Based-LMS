import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, List, ListItem, ListItemText, Paper, Divider, Typography, LinearProgress} from '@mui/material'
import {_URL} from '../../url.js'

const Assessments = () => {
   const { CourseID } = useParams()
   const { UserID } = useParams()
   var AssessmentArray = []
   const [Assessments, setAssessments] = useState([])
   const [loading, setLoading] = useState(false)

   useEffect( () => {
       axios.get(_URL + 'Courses/' + CourseID + '/Assessments').then(res => {
            console.log('This is the respose data', res.data)
            setLoading(false)
            setAssessments(res.data)
            console.log('These are the Assessments',Assessments)
       })
       setLoading(true)
   }, [])

   const showAssessments = () => {
       Assessments.map(Assessment => {
           AssessmentArray.push(
               <>
                 <ListItem>
                <ListItemText>
                <Link style={{'width': '80%'}} to={'/'+UserID+'/' + CourseID + '/' + Assessment._id}>
                  {Assessment.name}
                </Link>
                </ListItemText>
                </ListItem>
               <Divider></Divider>
               </>
           )
       })
       return AssessmentArray
   }




  return (
   <>
    {loading ? 
        <div>
            <Typography variant='h5' style={{textAlign:'center'}}>Please wait as the assessments load</Typography>
            <LinearProgress />
        </div>:
        <>
        <Paper style={{height: '60vh', maxHeight: '60vh',overflow: 'auto'}}>
            <List>
                {showAssessments()}
            </List>
        </Paper>
        </>
    }
    </>
  )
}

export default Assessments