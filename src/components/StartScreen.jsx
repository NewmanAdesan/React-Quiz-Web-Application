import React from 'react'

const StartScreen = ({numberOfQuestions, dispatch}) => {
  return (
    <div className='start-screen'>
        <h2>Welcome to The React Quiz</h2>
        <h3>{numberOfQuestions} questions to test your React mastery</h3>
        <button className='btn' onClick={()=>dispatch({type:"start-quiz"})}>Let's Start</button>
    </div>
  )
}

export default StartScreen;