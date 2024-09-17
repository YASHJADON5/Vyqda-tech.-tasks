import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import SignUpForm from './SignUpForm'
import { useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner.svg'
function Signup() {
  const navigate= useNavigate();
   const [loading,setLoading]=useState(false);
  useEffect(()=>{
     setLoading(true);
    const token = localStorage.getItem('token');
    if(token){
      setTimeout(()=>{
        navigate('/notes')
      },500)
     
    }
     else{

        setLoading(false);
      }

    

  },[])

  if(loading){
    return <div className='absolute inset-0 bg-white flex justify-center items-center '><img src={spinner} alt="" /></div>
  }


  return (
    <div>
      <NavBar />
      <SignUpForm/>
    </div>
  )
}

export default Signup
