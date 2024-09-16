import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [data,setData]= useState({})

  useEffect(()=>{
    
    (async()=>{
      try{
        const response= await axios.post("https://chimpu.online/api/post.php",{
          phonenumber:5677899
        })
        setData(response.headers);
        console.log(response.headers)

      }
      catch(err){
         console.log("something went wrong");
      }

    })()

  },[])

  return (
    <>
    <div>
      {Object.entries(data).map(([key,value],index)=>{
            return <div key={index}> <div>{key}</div> <div>{value}</div></div>
      })}
      </div>

    </>
  )
}

export default App
