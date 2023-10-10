import React from 'react'
import {ThreeDots} from "react-loader-spinner"

const Loader = () => {
  return (
    <div className='loading-container'>
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#ffffff" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
        <p>Loading Questions...</p>
    </div>
  )
}

export default Loader