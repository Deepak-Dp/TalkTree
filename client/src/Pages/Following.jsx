import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowingsPost } from '../Store/postSlice'
import PostSketelon from '../components/PostSketelon'

function Following() {

  const followingPost = useSelector((state)=> state.post.allFollowingsPost)
  const dispatch = useDispatch()
   const [loading , setLoading] = useState(false)
  const getAllFollowingPosts =()=>{
    setLoading(true)
      dispatch(getAllFollowingsPost())
      setLoading(false)
     }

  
  
  useEffect(()=>{
    getAllFollowingPosts()
  },[])
  return (
    <div className='h-full w-full'>
     
    {
     loading && (
     
       
         <div className='h-full w-full flex mt-8  justify-center items-center'>
           <p className='text-gray-500 text-lg animate-bounce'>Loading.....</p>
         </div>
   
     )}

     {
        !loading && followingPost?.length === 0 && (
          <div className='h-full w-full flex mt-8  justify-center items-center'>
            <p className='text-gray-500 text-lg animate-bounce'>No Posts Found</p>
          </div>
        )
     }
       <div>
         {
         followingPost?.map((data, index)=>{
           return (
             <div className='h-full w-full' key={data+ index}>
                  <PostSketelon data={data}/>
             </div>
           )
         })
       }
       </div>
     
    
   </div>
  )
}

export default Following