import { useState } from 'react'

import NavBar from './components/NavBar'
import Signup from './components/Signup'
import SignIn from '../src/components/SignIn'
import Body from './components/Body'

import {BrowserRouter,Route,Routes} from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     
     <Routes>
     
     <Route path='/' element={<SignIn />}></Route>
     <Route path='/signup' element={<Signup />}></Route>
     <Route path='/notes' element={<Body />}></Route>
  


     </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
