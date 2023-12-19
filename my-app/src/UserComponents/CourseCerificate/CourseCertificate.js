import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import {_URL} from '../../url.js'

const CourseCertificate = () => {
  //here we have to render conditionally
  //if progress is 100 in the course, then only we will show the certificate
  
  const { UserID } = useParams()
  const { CourseID } = useParams()
  const url = _URL + 'Progresses/' + UserID + '/'+ CourseID
  const [progress, setProgress] = useState({})
  const [course, setCourse] = useState({})
  const [certificate, setCertificate] = useState('')

  useEffect(() => {
      getInfo()
  }, [])

  const getInfo = async () => {
    await axios.get(url).then(res => {console.log('getting progress',res.data)
        setProgress(res.data)})
    await axios.get(_URL + 'Courses/' + CourseID).then(res => {
        console.log('getting Course',res.data)
        setCourse(res.data)
        console.log('res.data.cert', res.data.certificate)
        setCertificate(res.data.certificate)
    })
  }
  const checkProgress = (progress) => {
      console.log(progress)
      console.log('certificate', certificate)
      if(progress == 100){
          return(
            <a href={certificate} download >{extractString(certificate)}</a>
          )
      }
      else{
        return(
           <Typography style={{'textAlign':'center'}}variant='h6'>Certificate not available yet.</Typography>
          )
      }
  }

  function isCharDigit(n){
    return !!n.trim() && n > -1;
}
const extractString = (str) => {
    for (let i = 0; i < str.length; i++){
        if (isCharDigit(str[i]) && (str[i+1].toLowerCase() != str[i+1].toUpperCase()))
           {
            var substr = str.substring(i+1);
            return substr.replace(/%20/g, " ")
           }
    }
}
  return (
    <div>{checkProgress(progress.progress_value)}</div>
  )
}

export default CourseCertificate