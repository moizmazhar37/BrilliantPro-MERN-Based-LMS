import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CourseGrid from '../CourseGrid/CourseGrid';
import { useParams } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard';


export default function UserPortal() {
  const [value, setValue] = React.useState('Dashboard');
  const { UserID } = useParams() 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dashboard" value="Dashboard"/>
            <Tab label="Courses" value="Courses"/>
          </TabList>
        </Box>

        <TabPanel value="Dashboard"><Dashboard></Dashboard></TabPanel>
        <TabPanel value="Courses"><CourseGrid id={UserID}></CourseGrid></TabPanel>
     
      </TabContext>
    </Box>
  );
}
