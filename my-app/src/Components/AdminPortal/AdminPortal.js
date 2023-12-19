import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CourseGrid from '../CourseGrid/CourseGrid';
import Dashboard from '../Dashboard/Dashboard';
import { AppBar } from '@mui/material';
import { Toolbar, Typography } from '@mui/material';

export default function AdminPortal() {
  const [value, setValue] = React.useState('Dashboard');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
     

    <Box sx={{ width: '100%', typography: 'body1' }}>

      <TabContext value={value}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dashboard" value="Dashboard"/>
            <Tab label="Courses" value="Courses"/>
          </TabList>
        </Box>

        <TabPanel value="Dashboard"><Dashboard></Dashboard></TabPanel>
        <TabPanel value="Courses"><CourseGrid></CourseGrid></TabPanel>
        
      </TabContext>
    </Box>
    </>
   

  
  );
}
