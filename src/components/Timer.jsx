import React from 'react'
import { useEffect } from 'react'

const Timer = ({time, dispatch}) => {
  useEffect(()=>{
    const timeIntervalID = setInterval(()=>{
        dispatch({type:"update-time"})
    }, 1000);
    return () => {
        clearInterval(timeIntervalID);
    }
  }, [])
  const timeMinute = Math.floor(time/60);
  const timeSecond = time%60;
  return (
        <span className='btn w-16 h-10'>{timeMinute<10 ? "0" : ""}{timeMinute}:{timeSecond<10 ? "0" : ""}{timeSecond}</span>
  )
}

export default Timer