import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostSketelon from '../components/PostSketelon'
import { getAllPost } from '../Store/postSlice';

function ForYou() {

  const allPost = useSelector((state) => state.post.allPost)
  const [loading , setLoading] = useState(false)
  
 
  const dispatch = useDispatch()

  const getAllPostData =()=>{
    setLoading(true)
    dispatch(getAllPost())
    setLoading(false)
   }  
  
  
   useEffect(()=>{
    getAllPostData()
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
        !loading && allPost?.length === 0 && (
          <div className='h-full w-full flex mt-8  justify-center items-center'>
            <p className='text-gray-500 text-lg animate-bounce'>No Posts Found</p>
          </div>
        )
}

        <div>
          {
          allPost?.map((data, index)=>{
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

export default ForYou