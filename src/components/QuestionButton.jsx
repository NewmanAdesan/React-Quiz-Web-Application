import React from 'react'

const typesObject = {
    "prev": "prev-question",
    "next": "next-question",
    "finish": "answered-all-question",
}

const QuestionButton = ({type, dispatch, answer, lastQuestion, firstQuestion, answeredAllQuestion}) => {
  let returnNull = false;

  if (type == "prev") returnNull = firstQuestion;
  if (type == "next") returnNull = (answer==null || lastQuestion);
  if (type == "finish") returnNull = (!answeredAllQuestion);
//   if ((type=="prev" && firstQuestion) || (type="next" && (answer==null || lastQuestion)) || (type="finish" && !answeredAllQuestion) ) return null;

//   console.log(next);
  if (returnNull) return null;

  return (
    <button className='btn' onClick={()=>dispatch({type:typesObject[type]})}>{type}</button>
  )
}

export default QuestionButton