
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react';
import { useReducer } from 'react';

import './App.css'
import Header from './components/Header';


const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", finished
  status: "loading",
}

const reducer = function (state, action) {

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }

    case "dataFailed":
      console.log("There was an Error Fetching the Data.")
      return {
        ...state,
        status: "error",
      }
    default:
      throw new Error("Incorrect Action Type");
  }

}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({type:"dataReceived", payload:data}))
      .catch(data => dispatch({type:"dataFailed", payload:null}))
  }, [])

  return (
    <div className='app'>
      <Header />
    </div>
  )
}

export default App;
