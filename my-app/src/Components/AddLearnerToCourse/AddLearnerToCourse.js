import React, { useEffect } from 'react'
import { useState } from 'react'
import { List, ListItem, Typography, ListItemText, Divider,Avatar,ListItemAvatar } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { FormControl, Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import {_URL} from '../../url.js'


const AddLearnerToCourse = () => {

  let url = _URL + 'Learners'
  let { CourseID } = useParams()
  const LearnersArray = []
  const [learners,setLearners] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [course, setCourse] = useState({}) 
  const [added, setAdded] = useState(false)

  
  function Learners(){
    learners.map(learner => {
        console.log('names', learner.name)
        LearnersArray.push(
          <>
          <ListItem>
          <ListItemAvatar>
            <Avatar alt={learner.name} src="/static/images/avatar/1.jpg"/>
          </ListItemAvatar>

          <ListItemText>
          <Typography>{learner.name} ({learner.username})</Typography>
          </ListItemText>
     
          <Button onClick={() => addLearner(learner)} variant="outlined">Enrol</Button>

          </ListItem>
          <Divider></Divider>
          </>
          )
    })
    console.log(LearnersArray)
    return LearnersArray
  }

  useEffect(() => {

    axios.get(url).then(res => {
        const learners = res.data
        setLearners(learners)
        console.log('learners',learners)
    }).catch(err => console.log(err))
    

    axios.get(_URL + 'Courses/'+ CourseID).then(res => {
      setEnrolled(res.data.learners)
      setCourse(res.data)
    }).catch(err => console.log(err))
    //Learners()

    // const filter = async () => {
    //   for (let i = 0; i < learners.length; i++){
    //     for(let j = 0; j < enrolled.length; j++){
    //       if (same(learners[i], enrolled[j])){
    //         learners.splice(i,1)
    //         enrolled.splice(j,1)
    //       }
    //     }
    //   }
    // }
    // const fil = async () => {
    //   await filter()
    // }

    // fil()
    

  
    console.log('Learners...',learners)
    console.log('Enrolled...',enrolled)



  },[])
    
  //making changes here*************************************
  // for(let i = 0; i < enrolled.length; i++){
  //   console.log('Enrolled Progress: ', i, enrolled[i].progress)
  //   enrolled[i].progress.push(10)
  //   enrolled[i].courses_enrolled.push(CourseID)
  // }
  // for(let i = 0; i < enrolled.length; i++){
  //   console.log('Enrolled Progress: ', enrolled[i].name, enrolled[i].progress)
  // }
  
  //making changes here*************************************

  function same(learner, enrolled_learner){
    if (learner.username === enrolled_learner.username){
      return true
    }
    return false
  }

  for (let i = 0; i < learners.length; i++){
    for(let j = 0; j < enrolled.length; j++){
      if (same(learners[i], enrolled[j])){
        learners.splice(i,1)
        //enrolled.splice(j,1)
        setLearners(learners)
      }
    }
  }
 
  

  // //add learners to array.

  // function getUnenrolled(learners, enrolled){
  //   setLearners(learners.filter(x => !enrolled.includes(x)))
  //   console.log(learners)
  // }

  // function addLearner(learner){
    
  //    return
  // }

  const addLearner = async (learner) => {
    console.log(course)
    var l = learner
    console.log('dfadafa', l)
    //add the learner to the course
    course.learners.push(l)
    setCourse(course)
    console.log(course)
    


    await axios.put(_URL + 'Courses/'+ CourseID, course).then(res => {
      console.log('putres', res)
    })
    const progress = {
      learner_id: learner._id,
      course_id: CourseID,
      progress_value: 0
    }
    //setCourse(course)
    await axios.post(_URL + 'Progresses', progress).then(res => {
      console.log('progresspost', res)
    })
    
    if (added === true){
      setAdded(false)
    }
    else{
      setAdded(true)
    }

    // setTimeout(function(){
    //  setOpen(true)
    // },5000);
  }

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };


  return (
    <>
    <FormControl className='form' style={{marginLeft:'10%'}} id="myForm" name="myForm">
        <Typography variant='h5' style={{textAlign:'center', paddingTop: '2%', paddingBottom: '2%'}}> Unregistered Learners </Typography>
        <List>
          {Learners()}
        </List>  
    </FormControl>    
    </>
  )
}

export default AddLearnerToCourse