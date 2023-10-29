
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
import FinishScreen from './components/FinishScreen';
import QuestionButton from './components/QuestionButton';
import Timer from './components/Timer';


const GAMETIME = 300;

const initialState = {
  // list of questions
  questions: [],

  // "loading", "error", "ready", "active", finished
  status: "loading",

  // index of the current question
  index: 0, 

  // user answer for each question placed in an array. initially it's null
  answers: null,

  // points won so far
  points: 0,

  // quiz highscore
  highscore: 0,

  // keeps track of how many seconds have passed since quiz started 
  time: GAMETIME,
}

const reducer = function (state, action) {

  switch (action.type) {
    case "data-received":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        answers: action.payload.map(()=>null)
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
      state.answers[state.index] = action.payload;

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

    case "answered-all-question":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }

    case "restart-quiz":
      return {
        ...state,
        status: "ready",
        index: 0,
        answers: state.answers.map(()=>null),
        points: 0,
        time: GAMETIME
      }

    case "update-time":
      return {
        ...state,
        status: state.time == 0 ? "finished" : state.status,
        time: state.time != 0 ? state.time - 1 : state.time
      }

    default:
      throw new Error("Incorrect Action Type");
  }

}

function App() {

  const [{questions, status, index, answers, points, highscore, time}, dispatch] = useReducer(reducer, initialState);
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
            <ProgressBar numberOfQuestionsAnswered={index} numberOfQuestions={numberOfQuestions} totalPoint={totalPoint} points={points} answer={answers[index]}/>
            <Question questionData={questions[index]} answer={answers[index]} dispatch={dispatch}/>
            <div className='question-actions'>
              <QuestionButton type="next" dispatch={dispatch} answer={answers[index]} lastQuestion={index == numberOfQuestions - 1}/>
              <QuestionButton type="finish" dispatch={dispatch} answeredAllQuestion={answers[numberOfQuestions-1] != null}/>
              <Timer time={time} dispatch={dispatch} />
              <QuestionButton type="prev" dispatch={dispatch} firstQuestion={index == 0} />
            </div>
          </>
        }
        {status == "finished" && <FinishScreen points={points} totalPoint={totalPoint} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}

export default App;

/**
 * SETUP TIMER FUNCTIONALITY
 * once the quiz starts, we start counting in seconds. once the number of second has reached a particular value, the status of the application is changed to finished. this timer is displayed to the user in the format `7:30`
 * 1) we create a constant variable `GAMETIME` setting the number of seconds for the quiz.
 * 2) we create a new state `time` in the application set to `GAMETIME` which keeps track of how much seconds remains for the quiz to end.
 * 3) we will create a new action type in our application reducer function called "update-time"
 *      - first we will check if the current time (`time state`) is equal to zero;
 *      - if so we will change the application state to `finished`
 *      - if not, we would simply decrement the `time state` by 1 (meaning minus 1 seconds)
 * 4) once the quiz state that is the application status becomes `active`, we will use the setInterval function to update the `time state` every one second. 
 *      - beside the next button component, we would have the timer component; this would display the `time state` in the format "{minutes}:{seconds}"
 *      - in this, we would utilize the useEffect hook which would call the setInterval once on component mount.
 *      - the callback function in this setInterval dispatches the "update-time action"
 *      - in the useEffect hook, we would have a clean up function that clears the interval when the component upmounts.
 * 5) when the quiz is restarted, the `time state` is set back to `GAMETIME`
 *      
 * 

[FEATURE] Implemented Timer Functionality 

**Setting up Timer Functionality:**

1. Created a constant variable `GAMETIME` to set the number of seconds for the quiz.
2. Introduced a new state, `time`, in the application, initially set to `GAMETIME`, to track the remaining seconds until the quiz ends.
3. Added a new action type, `update-time` in the application reducer function.
    - Checked if the current time (`time` state) is equal to zero.
    - If equal to zero, changed the application state to `finished.`
    - If not, decremented the `time` state by 1 second.
4. Upon the quiz's start (when the application status is `active`), utilized the `setInterval` function to update the `time` state every second.
    - Displayed the remaining time to the user in the format `{minutes}:{seconds}` in a component called Timer beside the `Next button` component.
    - Utilized the `useEffect` hook to call `setInterval` once on component mount.
    - The callback function in `setInterval` dispatched the `update-time` action.
    - Included a cleanup function in the `useEffect` hook to clear the interval when the component unmounts.
5. When the quiz is restarted, the `time` state is reset to `GAMETIME`.

This commit message summarizes the implementation of timer functionality in the application, providing a clear and concise overview of the changes made.

 */
