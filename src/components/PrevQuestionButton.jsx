import React from 'react'

const PrevQuestionButton = ({dispatch, firstQuestion}) => {  
    
    // do not render button if user is currently on the first question
    if (firstQuestion) return null;
    return (
      <button className='btn' onClick={()=>dispatch({type:"prev-question"})}>Prev</button>
    )
}

export default PrevQuestionButton
