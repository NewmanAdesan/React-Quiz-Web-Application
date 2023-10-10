import React from 'react'

const Options = ({options}) => {
    return (
        <>
        {options.map(option => (
            <button className='btn btn-option' key={option}>{option}</button>
        ))}
        </>
    )
}

const Question = ({questionData}) => {
  return (
    <>
        <h3 className='question'>{questionData.question}</h3>
        <Options options={questionData.options}/>
    </>
  )
}

export default Question