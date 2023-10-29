import React from 'react'

const NextQuestionButton = ({dispatch, answer, lastQuestion}) => {

  // do not render button if user has not selected an option
  // do not render button if user is currently on the last question
  if (answer==null || lastQuestion) return null;
  return (
    <button className='btn' onClick={()=>dispatch({type:"next-question"})}>Next</button>
  )
}

export default NextQuestionButton
