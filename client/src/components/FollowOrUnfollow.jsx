import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, setFollowOrUnFollow } from '../Store/authSlice';

function FollowOrUnfollow(userdata) {

    const dispatch = useDispatch()

    
    const user = useSelector((state) => state.auth.user);


     
    
    const handleFollow = async () => {
        const response = await axios.post(
            'http://localhost:5000/api/v1/user/follow',{
                "followId": userdata?.userdata?._id,
            }
            ,{
                withCredentials: true,
            }
        );
        if (response.data.success) {
             dispatch(getAllUsers())
            dispatch(setFollowOrUnFollow({userId: userdata?.userdata?._id}))
            
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }


  return (
    <div>{
        user?.following?.includes(userdata?.userdata?._id) ? (
            <button onClick={handleFollow} >
                Unfollow
            </button>
        ) : (
            <button onClick={handleFollow} >
                Follow
            </button>
        )
        }</div>
  )
}

export default FollowOrUnfollow