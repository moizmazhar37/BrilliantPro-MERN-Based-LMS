//This timer code was copied from www.geeksforgeeks.com. 

import React, { useState, useRef, useEffect } from 'react'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Timer = (props) => {
    const Ref = useRef(null);
    const [end, setEnd] = useState(false)
    const [timer, setTimer] = useState('00:00:00');
    const navigate = useNavigate()
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
                    
        if(props.end === true){
            setEnd(true)
        }
        
        else if (total >= 0) {
            
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the begining of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
       
        else{
            clearTimer()
            setEnd(true)
            navigate('./ResultFail')
        }
    }

    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:00:00');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        if(!end){
            const id = setInterval(() => { 
                startTimer(e);
            }, 1000)
            Ref.current = id;
        }
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        console.log('time', (props.time*60))
        deadline.setSeconds(deadline.getSeconds() + (props.time*60));
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, [props])

    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
  return (
    <Typography variant='h5'>{timer}</Typography>
  )
}

export default Timer