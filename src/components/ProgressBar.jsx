import React from 'react'

const ProgressBar = ({numberOfQuestions, numberOfQuestionsAnswered, totalPoint, points, answer}) => {
  return (
    <>
        <progress className='progress-bar' value={String(answer === null ? numberOfQuestionsAnswered : numberOfQuestionsAnswered + 1)} max={String(numberOfQuestions)}> 0% </progress>
        <div className="progress-meta">
          <span>Question <strong>{numberOfQuestionsAnswered+1}</strong>/{numberOfQuestions}</span>
          <span>Points <strong>{points}</strong>/{totalPoint}</span>
        </div>
    </>
  )
}

export default ProgressBar