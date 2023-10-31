import React from 'react'

const Main = ({children}) => {
  return (
    <main className='main'>
        <article>{children}</article>
    </main>
  )
}

export default Main