import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import axios from 'axios'
import { PieChart } from 'react-minimal-pie-chart';
import { LinearProgress } from '@mui/material';
import {_URL} from '../../url.js'

const Dashboard = () => {
  const url_courses_count = _URL + "Courses/count"
  const url_learners_count = _URL + 'Learners/count'

  const [usernum,setUsernum] = useState(0)
  const [coursenum, setCoursenum] = useState(0)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    console.log(url_courses_count)
    axios.get(url_courses_count).then(res => {
      setCoursenum(res.data)
    })
    axios.get(url_learners_count).then(res => {
      setUsernum(res.data)
      setLoading(false)
    })
    setLoading(true)

  }, [])


  return (
    <>
    {loading ? <div>
                <Typography variant='h5' style={{textAlign:'center'}}>Please wait as the data loads</Typography>
                <LinearProgress />
              </div>: 
    <>
    <div style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'gap': '20%'}}>
      <Typography variant='h3'> Total Courses: {coursenum}</Typography>
      <Typography variant='h3'> Total Users: {usernum}</Typography>
    </div>

      <PieChart style={{marginLeft: '35%', marginTop: '4%'}} viewBoxSize={[300,300]} reveal animate={true} animationDuration={1000}
    data={[
      { title: 'Courses', value: coursenum, color: '#428df5'},
      { title: 'Users', value: usernum, color: '#42e3f5'},
    ]}
    />;
    </>
    }
    
    </>

  )
}

export default Dashboard