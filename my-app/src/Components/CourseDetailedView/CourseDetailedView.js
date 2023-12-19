import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import RegisteredUsers from '../RegisteredUsers/RegisteredUsers';
import {useParams} from 'react-router-dom';
import CourseSettings from '../CourseSettings/CourseSettings';
import Materials from '../Materials/Materials';
import Assessments from '../Assessments/Assessments';

const CourseDetailedView = () => {
  // const search = useLocation().search;
  // const id=new URLSearchParams(search).get("id");
  // //const id = props.match.params.id

  const [value, setValue] = React.useState('Materials')

  const updateState = (event, newValue) => {
      setValue(newValue)
  }
  const { CourseID } = useParams()

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={updateState} aria-label="Course tabs">
          <Tab label="Materials" value="Materials"/>
          <Tab label="Assessments" value="Assessments"/>
          <Tab label="Settings" value="Settings"/>
          <Tab label="Users" value="Users"/>
        </TabList>
      </Box>
      {/* {console.log('Param value coursedetailedview: ', props.match.params.id)} */}
      <TabPanel value="Materials"><Materials></Materials></TabPanel>
      <TabPanel value="Assessments"><Assessments></Assessments></TabPanel>
      <TabPanel value="Settings"><CourseSettings id={CourseID}></CourseSettings></TabPanel>
      <TabPanel value="Users"><RegisteredUsers></RegisteredUsers></TabPanel>
    </TabContext>
  </Box>
  )
}

export default CourseDetailedView