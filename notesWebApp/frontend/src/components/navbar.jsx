import React from 'react'
import menuIcon from '../assets/menuIcon.svg'
import { useNavigate } from 'react-router-dom';

function NavBar({signOut}) {
  const navigate= useNavigate();
  
  const onclick=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    
    <div className='bg-[#1f1f1f] h-16 flex justify-between'>
      <div className='flex'>
      <div className=' my-auto '><img className='h-8 w-8' src={menuIcon} alt="" /></div>
      <div className='ml-2 text-5xl font-sans font-semibold text-white'>Notes</div>
      </div>
     
     {signOut&&<div className='mt-2 mr-4'>      
        <button onClick={onclick} className='bg-red-600 h-12 w-24 my-auto rounded-md hover:bg-red-700 text-white'>Sign Out</button>
      </div>
    }
   </div>
  )
}

export default NavBar
