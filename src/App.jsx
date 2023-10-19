
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react';
import { useReducer } from 'react';

import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextQuestionButton from './components/NextQuestionButton';
import PrevQuestionButton from './components/PrevQuestionButton';
import ProgressBar from './components/ProgressBar';


const initialState = {
  // list of questions
  questions: [],

  // "loading", "error", "ready", "active", finished
  status: "loading",

  // index of the current question
  index: 0, 

  // user answer for the current question. initially it's null
  answer: null,

  // points won so far
  points: 0,
}

const reducer = function (state, action) {

  switch (action.type) {
    case "data-received":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        answer: action.payload.map(()=>null)
      }

    case "data-failed":
      console.log("There was an Error Fetching the Data.")
      return {
        ...state,
        status: "error",
      }

    case "start-quiz":
      return {
        ...state,
        status: "active"
      }

    case "pick-option":
      // current question
      const cur = state.questions[state.index]

      // store user answer
      state.answer[state.index] = action.payload;

      // add points to user if answer is correct
      return {
        ...state,
        points: cur.correctOption === action.payload ? state.points + cur.points : state.points,
      }

    case "next-question":
      return {
        ...state,
        index: state.index + 1,
      }

    case "prev-question":
      return {
        ...state,
        index: state.index - 1,
      }

    default:
      throw new Error("Incorrect Action Type");
  }

}

function App() {

  const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const totalPoint = questions.reduce((prev, cur) => prev = prev + cur.points, 0)

  useEffect(()=>{
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({type:"data-received", payload:data}))
      .catch(data => dispatch({type:"data-failed", payload:null}))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
        {status == "active" && 
          <>
            <ProgressBar numberOfQuestionsAnswered={index} numberOfQuestions={numberOfQuestions} totalPoint={totalPoint} points={points}/>
            <Question questionData={questions[index]} answer={answer[index]} dispatch={dispatch}/>
            <div className='question-actions'>
              <NextQuestionButton dispatch={dispatch} answer={answer[index]} lastQuestion={index == numberOfQuestions - 1}/>
              <PrevQuestionButton dispatch={dispatch} firstQuestion={index == 0} />
            </div>
          </>
        }
      </Main>
    </div>
  )
}

export default App;
