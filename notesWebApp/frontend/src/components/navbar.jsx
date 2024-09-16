import React from 'react'
import menuIcon from '../assets/menuIcon.svg'

function NavBar() {
  return (
    
    <div className='bg-[#1f1f1f] h-16 flex'>
     <div className=' my-auto '><img className='h-8 w-8' src={menuIcon} alt="" /></div>
    <div className='ml-2 text-5xl font-sans font-semibold text-white'>Notes</div>
     
   </div>
  )
}

export default NavBar
