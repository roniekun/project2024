import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';

const Close = () => {
    const { setToggleMenu } = useContext(DataContext)
  return (
            <button
            onClick={()=>setToggleMenu(false)}
            className='group  cursor-pointer brightness-95 hover:brightness-100 text-gray-300 place-items-center flex mx-[5vw] rounded-2xl'>
            <span className='text-[5vw]'>Close</span> 
            <IoCloseSharp className='fill-gray-300 w-7 h-7 relative group-hover:opacity-90'/>
            </button> 
  )
}

export default Close