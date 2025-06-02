import React, { use } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import FollowOrUnfollow from './FollowOrUnfollow';
import toast from 'react-hot-toast';

function FindUserSketelon(data) {
    
    const navigate = useNavigate()

    console.log(data);
    

    const redirectToProfile = () => {
        if (data?.data?._id) {
            navigate(`/profile/${data.data._id}`,{
                state: {
                    userId: data.data._id,
                    name: data.data.name,
                    profileImg: data.data.profileImg
                }
            });
        } else {
            toast.error("User ID is not available");
        }
    }
    
  return (
    <div  className='w-full pl-3 mt-4 flex items-center justify-start gap-2 '>

        <div onClick={redirectToProfile} className="h-[35px] w-[35px] rounded-full ">
             {
              data?.data?.profileImg ? (
                 <img src={data?.data?.profileImg} alt=""  className="h-full w-full border-2 border-gray-800 rounded-full"/>
              ):(
               <FaRegCircleUser size={35} className="text-gray-400 "/>
              )
             }
       </div>

       <div className='w-[40%] overflow-hidden flex flex-col'>
            <p className='text-gray-800 font-semibold text-sm line-clamp-1'>@{data?.data?.username}</p>
             <p className='text-gray-800 font-semibold text-sm line-clamp-1'>@{data?.data?.name}</p>
             
       </div>

      

              <div className="bg-blue-500  hover:bg-blue-700 duration-300 text-white font-sans font-medium px-2 py-1 rounded-md ">
                  {
                    <FollowOrUnfollow userdata={data?.data} />
                  }
              </div>


       
        

        
    </div>
  )
}

export default FindUserSketelon