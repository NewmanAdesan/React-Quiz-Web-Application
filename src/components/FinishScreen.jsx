import React from 'react'

/**
 * 1) Setting up the Layout & Style of the Finish Screen
 * 1a) add a p element to show score
 * 1b) add another p element to show highscore
 * 1c) add a button element to Restart Quiz
 * 1d) add the class btn, btn-option & show-score(text-center, transition-none) to the first p element
 * 1e) add the class btn & ml-auto to the button element
 * 
 * 
 * 2) Set Score feedback functionality
 * 2a) add the points prop, the totalPoints prop to the first p element
 * 2b) in FinishScreen, using the points & totalPoints prop, calculate the percentage
 * 2c) based on the percentage (>90, >60, >30, <30) choose emojis
 * 2d) add the emoji to the first p element
 *
 * 
 * 3) Setup HighScore functionality
 * 3a) add the highscore state set to zero in the initialState object
 * 3b) when the last question is answered, the finish button appear. on click of this finished button the action `answered-all-questions` is dispatched which simply sets the application status to `finished`. now also we would update the highscore state depending on it users score is greater than the current highscore.
 * 3d) the highscore state will be passed as a prop to the FinishScreen & rendered to the second p element
 * 
 * 
 * 4) Restart Quiz functionality
 * 4a) add a new action type into our reducer that restart the quiz; this action is called `restart-quiz`
 * 4ai) the status state will be set to `ready`;
 * 4aii) the index state will be set to 0;
 * 4aiii) the answers state will be set to null;
 * 4aiv) the points state will be set to 0;
 * 4b) add the onClick attribute to the button element which will dispatch the action  `restart-quiz`
 * 
 */

const FinishScreen = ({points, totalPoint, highscore, dispatch}) => {
  // compute score percentage
  const pointPercentage = (points * 100 / totalPoint).toPrecision(3);

  // compute emoji based on score percentage
  let emoji;
  if (pointPercentage > 90) emoji = "🤩";
  else if (pointPercentage > 60) emoji = "🙂";
  else if (pointPercentage > 30) emoji = "😐";
  else emoji = "🤔";

  return (
    <div>
      <p className='score'>{emoji} You scored <strong>{points}</strong> out of {totalPoint} points ({pointPercentage}%)</p>
      <p className='text-center text-[14px]'>Highscore: {highscore} points</p>
      <button className='btn ml-auto mt-5' onClick={()=>dispatch({type:"restart-quiz"})}>Restart Quiz</button>
    </div>
  )
}

export default FinishScreen;