import { useState } from 'react'

import NavBar from './components/navBar'
import Body from './components/Body'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <Body/>
    </>
  )
}

export default App
