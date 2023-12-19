import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import UserListItem from '../UserListItem/UserListItem';
import { Button } from '@mui/material';
import { Paper, Typography, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import {_URL} from '../../url.js'
import axios from 'axios';



const RegisteredUsers = (props) => {
  const LearnersArray = []
  let url = _URL +'Courses/'
  let { CourseID } = useParams()

  const [learners,setLearners] = useState([])
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(false)


  const updateSelf = () => {
    if (flag === false)
      setFlag(true)
    else
      setFlag(false)
    console.log('I have been called (updateSefl)')
    return flag
  }
  
//changes-----------------------
  // const getProgress = async (learner_id) => {
  //   console.log('id', learner_id)
  //   await axios.get('http://localhost:4000/Progresses/' + learner_id + '/' + CourseID).then(res => {
  //     return(res.data.progress_value)
  //   })
  // }
//changes-----------------------

  function Learners(){
    learners.map(learner => {
      // console.log('names', learner._id)
      // const Progress = getProgress(learner._id)
      // console.log(Progress, 'Progress value')
      LearnersArray.push(
        <>
          <ListItem> 
          <UserListItem name={learner.name} id={learner._id} progress={50} signal={updateSelf}></UserListItem>
          </ListItem>
          <Divider>
          </Divider>
        </>
      )
    })
    return LearnersArray
  }

  useEffect(() => {
    axios.get(url + CourseID).then(res => {
      setLoading(false)
      const Course = res.data
      const learners = Course.learners
      setLearners(learners)
      console.log('learners',learners)
    }).catch(err => console.log(err))
    setLoading(true)

  },[flag])

  return (
    <>
    {loading ? 
    <div>
      <Typography variant='h5' style={{textAlign:'center'}}>Please wait as the Users load</Typography>
      <LinearProgress />
    </div>:
    <>
      <Paper style={{height: '60vh',maxHeight: '60vh', overflow: 'auto'}}>
          <List>
              {Learners()}
          </List>
      </Paper>
    


      <Link to={'/admin/addLearner/'+ CourseID }> 
      <Button style={{'marginTop':'2%' }} variant='contained' fullWidth> Add New User + 
      </Button>
      </Link>
    </>
    }
    
   

  </>
  )
}

export default RegisteredUsers