import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import CreatePost from '../components/CreatePost'

function Feed() {
  return (
    <div className='flex flex-col mt-[50px] md:mt-[0px] lg:mt:[0px]'>
      <div className='w-full flex justify-center items-center border-b-2 border-gray-300 '>
           <NavLink to={'/'} className={({isActive})=>` w-[50%] font-sans font-medium text-center py-2 ${isActive ? "bg-blue-400 text-white": "bg-gray-200"}`}>For You</NavLink>
           <NavLink to={'/following'} className={({isActive})=>` w-[50%] font-sans font-medium text-center py-2 ${isActive ? "bg-blue-400 text-white": "bg-gray-200"}`}>Following</NavLink>
      </div>
      
        <CreatePost/>
     
       <Outlet/>

    </div>
  )
}

export default Feed