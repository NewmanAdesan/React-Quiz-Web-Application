import React from 'react'

const typesObject = {
    "prev": "prev-question",
    "next": "next-question",
    "finish": "answered-all-question",
}

const QuestionButton = ({type, dispatch, answer, lastQuestion, firstQuestion, answeredAllQuestion}) => {
  let zeroOpacity = false;

  if (type == "prev") zeroOpacity = firstQuestion;
  // if (type == "next") zeroOpacity = (answer==null);
  if (type == "next"){
    if (lastQuestion && !answeredAllQuestion) zeroOpacity = true;
    else if (lastQuestion) return null;
  }
  if (type == "finish" && !answeredAllQuestion) return null;

  return (
    <button className={`btn ${zeroOpacity?"opacity-0 pointer-event-none":"opacity-100"}`} onClick={()=>dispatch({type:typesObject[type]})}>{type}</button>
  )
}

export default QuestionButton