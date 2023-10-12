
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


const initialState = {


  questions: [],


  // "loading", "error", "ready", "active", finished
  status: "loading",

  // index of the current question
  index: 0, 

  // user answer for the current question. initially it's null
  answer: null,
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
      state.answer[state.index] = action.payload;
      return {
        ...state,
      }

    default:
      throw new Error("Incorrect Action Type");
  }

}

function App() {

  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);

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
        {status == "ready" && <StartScreen numberOfQuestions={questions.length} dispatch={dispatch} />}
        {status == "active" && <Question questionData={questions[index]} answer={answer[index]} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}

export default App;
