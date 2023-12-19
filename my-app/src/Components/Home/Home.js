import React from 'react'
import { Paper, Typography, createTheme} from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
// const useStyles = makeStyles((theme) => ({
//     font: {
//         color: 'blue'
//     },

// }))


const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });


const Home = () => {

  //const classes = useStyles();

  return (
    <>
    <Paper style={{display: "flex",flexDirection:"column", alignItems: "center", marginTop:"2%", backgroundColor: 'aliceblue'}}>
            <Typography variant='h3' >Welcome to <span style={{backgroundColor: "#1976d2", color: "white"}}>BrillantPro</span></Typography> 
            <Typography variant='h6' style={{padding:"3%"}}> BrilliantPro is a learning management sytem. It has both teacher and student modules. <br></br>
             Here are some of the things that make BrilliantPro special:
             <ul style={{paddingTop:"5%"}}>
                <li>Students can attempt examinations and quizzes in real time.</li>
                <li>Students can view their progress in percentage for each enrolled course.</li>
                <li>Teachers can view the progress of each and every student in each and every course.</li>
             </ul>

             </Typography> 

        <div style={{gap:"20%"}}>
            <Link to='/admin'> <Typography variant='h5'><pre>Teacher Mode</pre> </Typography></Link>
            <Link to='/Signup'> <Typography variant='h5'><pre>Learner Mode</pre></Typography></Link>
        </div>
        <Accordion style={{margin:"3%"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h5'>How do I use BrilliantPro?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1'>
           Here are steps you can follow to get a demo of some of BrilliantPro's features:
           <ol>
                <li>Sign up as a student <Link to='/Signup'>here</Link>.</li>
                <li>Before you log in, enter the teacher mode <Link to='/admin'>here</Link>.</li>
                <li>Click the <span style={{color:"grey"}}>COURSES</span> tab, then open any one of the courses.</li>
                <li>Click the <span style={{color:"grey"}}>USERS</span> tab.</li>
                <li>Click the <span style={{color:"blue"}}>ADD NEW USER</span> button.</li>
                <li>Find yourself in the list and enroll yourself in the course.</li>
                <li>Leave the teacher mode and Login with your student credentials <Link to='/login'>here</Link>.</li>
                <li>Click the <span style={{color:"grey"}}>COURSES</span> tab. You will find the course you enrolled in there.</li>
                <li>Open the course.</li>
                <li>Open the <span style={{color:"grey"}}>ASSESSMENTS</span> tab.</li>
                <li>Open any Assessment and attempt it!</li>
           </ol>
           Explore both the <Link to='/admin'>Teachers Mode</Link> and the <Link to='/login'>Learners Mode</Link> yourself to get a full taste of BrilliantPro.
          </Typography>
        </AccordionDetails>
      </Accordion>
                
    </Paper>
    

   
    </>
    
  )
}

export default Home