import React from 'react'

const Options = ({options, answer, correctOption, dispatch}) => {
    return (
        <>
        {options.map((option, index) => (
            <button 
                className={`
                            btn btn-option 
                            ${index===answer ? "answer" : ""} 
                            ${answer==null ? "" 
                                           : index==correctOption ? "correct-answer" 
                                                                  : index==answer ? "wrong-answer" 
                                                                                  : "other-answer" }
                          `} 
                key={option}
                disabled={answer!=null}
                onClick={()=>{dispatch({type:"pick-option", payload:index})}}>
                  {option}
            </button>
        ))}
        </>
    )
}

const Question = ({questionData, answer, dispatch}) => {
  return (
    <>
        <h3 className='question'>{questionData.question}</h3>
        <Options options={questionData.options} answer={answer} correctOption={questionData.correctOption} dispatch={dispatch}/>
    </>
  )
}

export default Question