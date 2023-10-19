import React from 'react'

const ProgressBar = ({numberOfQuestions, numberOfQuestionsAnswered, totalPoint, points}) => {
  return (
    <>
        <progress className='progress-bar' value={String(numberOfQuestionsAnswered)} max={String(numberOfQuestions)}> 0% </progress>
        <div className="progress-meta">
          <span>Question <strong>{numberOfQuestionsAnswered+1}</strong>/{numberOfQuestions}</span>
          <span>Points <strong>{points}</strong>/{totalPoint}</span>
        </div>
    </>
  )
}

export default ProgressBar