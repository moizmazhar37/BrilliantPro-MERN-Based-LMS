import logo from './logo.svg';
import {BrowserRouter, Router, Routes,Route, Link} from 'react-router-dom';
import Login from './UserComponents/Login/Login';
import Signup from './UserComponents/Signup/Signup';
import './App.css';
import AdminPortal from './Components/AdminPortal/AdminPortal';
import CourseDetailedView from './Components/CourseDetailedView/CourseDetailedView';
import CreateCourse from './Components/CreateCourse/CreateCourse';
import AddLearnerToCourse from './Components/AddLearnerToCourse/AddLearnerToCourse';
import CreateAssessment from './Components/CreateAssessment/CreateAssessment';
import Assessment from './Components/Assessment/Assessment4';
import UserPortal from './UserComponents/UserPortal/UserPortal';
import CourseDetailedViewUser from './UserComponents/CourseDetailedViewUser/CourseDetailedViewUser';
import UserAssessment from './UserComponents/UserAssessment/UserAssessment'
import ResultFail from './UserComponents/ResultFail/ResultFail';
import Home from './Components/Home/Home';
import { AppBar } from '@mui/material';
import { Toolbar, Typography } from '@mui/material';

function App() {
  return (
  <>
  <AppBar variant='static' position='sticky'>
  <Toolbar variant='dense'>
    <i class="fa fa-lightbulb-o fa-spin fa-5x" aria-hidden="true"></i>
    {/* <Link to='/'> */}
      <Typography variant="h6" color="inherit" component="div">
      BrillantPro
      </Typography>
    {/* </Link> */}
  </Toolbar>
  </AppBar>
  
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/Login' element={<Login></Login>}></Route>
      <Route path='/Signup' element={<Signup></Signup>}></Route>
      <Route path='/admin' element={<AdminPortal></AdminPortal>}></Route>
      <Route path='/admin/CreateCourse' element={<CreateCourse></CreateCourse>}></Route>
      <Route path='/admin/addLearner/:CourseID' element={<AddLearnerToCourse></AddLearnerToCourse>}></Route>
      <Route path='/admin/:CourseID' element={<CourseDetailedView></CourseDetailedView>}></Route>
      <Route path='/admin/:CourseID/addAssessment' element={<CreateAssessment></CreateAssessment>}></Route>
      <Route path='/admin/:CourseID/:AssessmentID' element={<Assessment></Assessment>}></Route>
      <Route path='/:UserID' element={<UserPortal></UserPortal>}></Route>
      <Route path='/:UserID/:CourseID' element={<CourseDetailedViewUser></CourseDetailedViewUser>}></Route>
      <Route path='/:UserID/:CourseID/:AssessmentID' element={<UserAssessment></UserAssessment>}></Route>
      <Route path='/:UserID/:CourseID/:AssessmentID/ResultFail' element={<ResultFail></ResultFail>}></Route>
    </Routes>
  </BrowserRouter>

  </>
  
  );
}

export default App;
