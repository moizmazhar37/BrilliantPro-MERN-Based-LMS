import React from 'react'
import { Typography } from '@mui/material'

const ResultFail = () => {
  return (
    <>
        <Typography variant='h6' style={{textAlign:'center', paddingBottom: '2%',paddingRight: '4%'}}><b>Sorry.</b> Time Over</Typography>
        <Typography variant='h6' style={{textAlign:'center', paddingBottom: '2%',paddingRight: '4%'}}><b>Result:</b> You have failed</Typography>
    </>
  )
}

export default ResultFail