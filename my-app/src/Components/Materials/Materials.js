import React, { useEffect, useState } from 'react'
import { Button, List, ListItem, Divider, ListItemText,Typography, Paper, LinearProgress } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {_URL} from '../../url.js'
const Materials = () => {
   
   const { CourseID } = useParams()
   const url =_URL+'Courses/'
   const [materials, setMaterials] = useState([])
   const [course, setCourse] = useState({})
   const [flag, setFlag] = useState(false)
   const [loading, setLoading] = useState(false)
   var uploadedFile = ''
   const MaterialArray = []


   useEffect(() => {
        
        axios.get(url + CourseID).then(res => {
            const materials = res.data.materials
            console.log(materials)
            setLoading(false)
            setMaterials(materials)
            setCourse(res.data)
            console.log(course)
            console.log('learners', course.learners)
        })
        setLoading(true)
   }, 
   [flag])

   const extractMaterial = () => {
       materials.map((mat)=> {
            MaterialArray.push(
                <>
                <ListItem>
                <ListItemText>
                    {/* <Typography variant='body1'>{props.name}</Typography> */}
                    <a href={mat} download >{extractString(mat)}</a>
                </ListItemText>   
                <Button onClick={() => removeMaterial(mat)}> Remove </Button>
                </ListItem>
                <Divider></Divider>
                </>
            )
       })
    return (
       MaterialArray
    )
   }

    function isCharDigit(n){
        return !!n.trim() && n > -1;
    }

    const extractString = (str) => {
        for (let i = 0; i < str.length; i++){
            if (isCharDigit(str[i]) && (str[i+1].toLowerCase() !== str[i+1].toUpperCase())){
                var substr = str.substring(i+1);
                return substr.replace(/%20/g, " ")
            }
                
        }
    }

   const rerender = () => {
       if (flag === true){
           setFlag(false)
       }
       else{
           setFlag(true)
       }
   }

   const uploadFile = (e) => {
       uploadedFile = e.target.files[0]
       document.getElementById('material').innerHTML = uploadedFile.name
    
   }
   const addNew = async () => {
        const file = uploadedFile
        const formData = new FormData()
        await formData.append('files', file)
        for (let [key, value] of formData.entries()) { 
            console.log(key, value);
        }
        await axios.post(url + CourseID + '/addMaterial', formData).then(res => console.log('putting course', res)).catch(err => console.log(err))
        rerender()
   }

   const removeMaterial = async (mat) => {
    console.log('material-->', mat)
    await axios.put(url + CourseID + '/removeMaterial', {mat}).then(res => console.log('removing course', res)).catch(err => console.log(err))
    rerender()
   }


  return (
    <>
    {loading ? 
        <div>
        <Typography variant='h5' style={{textAlign:'center'}}>Please wait as the materials load</Typography>
        <LinearProgress />
        </div>:
        <>
        <Paper style={{height: '40vh', maxHeight: '40vh',overflow: 'auto'}}>
            <List>
                {extractMaterial()}
            </List>
        </Paper>
    
        <Button variant="outlined" component="label" style={{'width': '100%', 'marginTop': '5%'}}>Upload new Material<input type="file" hidden onChange={uploadFile}/></Button>
        <Typography variant='body2' id='material' style={{'marginBottom': '2%', 'textAlign': 'center', color:"#1976d2"}}>No file Attached</Typography>
        <Button variant="contained" component="label" style={{'width': '100%'}} onClick={addNew}>Save</Button>
        </>
    }
    </>
  )
}

export default Materials