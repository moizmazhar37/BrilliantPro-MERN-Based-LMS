import React, { Component } from 'react'
import CourseCard from '../CourseCard/CourseCard'
import Grid from '@mui/material/Grid';
import { Button, Paper, Typography, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {_URL} from '../../url.js'


export class CourseGrid extends Component {
  url = _URL +`Courses/specific/`

  state = {
    Courses: [],
    loading: false
  }


  componentDidMount(){
    const id = this.props.id
    axios.get(this.url + id).then(res => {
      this.setState({loading: false})
      const courses = res.data
      this.setState({Courses: courses})
    })
    this.setState({loading: true})
  }
  getCoursesInfo(){
    const course_info = []
    this.state.Courses.map(Course => {
      course_info.push(<Grid item xs={4}><CourseCard name={Course.name} description={Course.description} image={Course.course_image} id={Course._id}/></Grid>)
    })
    console.log(course_info)
    return course_info
  }


  render() {
    return (
      <>
      {this.state.loading ? 
                <div>
                  <Typography variant='h5' style={{textAlign:'center'}}>Please wait as the courses load</Typography>
                  <LinearProgress />
                </div>:
                  <>
                  <Paper style={{height: '60vh', maxHeight: '60vh', overflow:'auto'}}>
                    <Grid container spacing={2}>
                      {this.getCoursesInfo()}
                    </Grid>
                  </Paper>
                  
                  <Link to='/admin/CreateCourse'>
                    <Button style={{'marginTop':'2%' }} variant='contained' fullWidth> Create New Course + </Button>
                  </Link>
                  </>
      }
      </>
    )
  }
}

export default CourseGrid

// const CourseGrid = () => {
//   const Courses=[]
//   //get courses from backend here
//   //const displayCourses = () => {
//     for (let i = 0; i < 10; i++){
//         Courses.push(<Grid item xs={4}><CourseCard name='Web Development' description='This is an introductory web development course.'/></Grid>)
//     }
// //   }
//   return (
//     <>
//     <Grid container spacing={2}>
//         {Courses}
//     </Grid>
//     <Link to='/admin/CreateCourse'>
//       <Button style={{'marginTop':'1.5%' }} variant='contained' fullWidth> Create New Course + </Button>
//     </Link>
//     </>
//   )
// }

