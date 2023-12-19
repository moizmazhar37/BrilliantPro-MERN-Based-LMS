import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Divider, Paper,ListItem, ListItemText, List, Typography, LinearProgress} from '@mui/material'
import {_URL} from '../../url.js'

const Assessments = () => {
   const { CourseID } = useParams()
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

   useEffect(() => {

   }, [Assessments])

   const removeAssessment = (assessment) => {
    
    const body = {
        _id: assessment
    }

    axios.put(_URL + 'Courses/' + CourseID + '/removeAssessment', body).then(res => {console.log(res)
    setAssessments(Assessments.filter((assess) => {
        return assess._id != assessment
    }))
    })
   }

   const showAssessments = () => {
       Assessments.map(Assessment => {
           AssessmentArray.push(
               <>
               <ListItem>
                <ListItemText>
                <Link style={{'width': '80%'}} to={"/admin/" + CourseID + '/' + Assessment._id}>
                        {/* <Button variant="outlined" style={{'width': '80%', 'marginLeft': '10%', 'marginTop': '2%'}}> </Button> */}
                        {Assessment.name}
                    </Link>
                </ListItemText>
                    <Button onClick={() => removeAssessment(Assessment._id)}> Remove </Button>
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
    
        <Link to={"/admin/" + CourseID + '/addAssessment'}>
                <Button variant="contained" style={{'width': '100%', 'marginTop': '2%'}}> Add Assessment</Button>
        </Link>
        </>
    }
    </>
  )
}

export default Assessments