import React, { useState } from 'react'
import uploadFile from '../util/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getUserData } from '../Store/authSlice';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../Store/postSlice';

function EditProfile({data,openEditProfileHandler,getUserProfile}) {

   
    const [wait, setWait] = useState(false)
    const dispatch = useDispatch()

     const [updatedData, setUpdatedData] = useState({
        name: data.name,
        bio: data.bio,
        link: data.link,
        profileImg: data.profileImg,
        coverImg: data.coverImg,
        
    });

     const getAllPostData =()=>{
        dispatch(getAllPost())
       }


    const submit = (e) => {
        e.preventDefault();
      
        

    }




    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const  uploadImage= async (e) => {

        setWait(true)
        const file = e.target.files[0];
        
      const uploadfile = await uploadFile(file);

        console.log("uploadfile===>",uploadfile);

        setUpdatedData((prev) => ({
            ...prev,
            [e.target.name]: uploadfile,
        }));
         
        setWait(false)

    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getUser = () => {
           
        dispatch(getUserData()).then((data) => {
            console.log("data", data.payload.data);

            
        })
    }


    const submitDataHandler = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${import.meta.env.VITE_API}/api/v1/user/updateUser`, updatedData, {
            withCredentials: true,
        });
       
        if (response?.data?.success) {
            toast.success(response?.data?.message);
           getUser()
           getUserProfile()
           getAllPostData()
            setUpdatedData({
                name: "",
                bio: "",
                link: "",
                profileImg: "",
                coverImg: "",
            });
            openEditProfileHandler()
        } else {
            toast.error(response?.data?.message);
        }
    } 


  
    
    

  return (
    <div className=' fixed top-0 left-0 right-0 bottom-0 bg-slate-300 bg-opacity-50 flex justify-center items-center '>
   
        <div className='w-[90%] md:w-[50%] lg:w-[30%] h-[550px] bg-white rounded-lg shadow-lg flex flex-col '>
           <div className=' flex justify-between items-center p-3'>
                <h1 className='text-lg font-sans font-medium'>Edit Profile</h1>
                <button onClick={openEditProfileHandler} className='text-lg hover:text-red-600 duration-300 font-bold'>X</button>
            </div>

            <form action="" onSubmit={submit}>
                
                <div className='flex flex-col gap-2 p-3'>   
                    <label htmlFor="profileImg" className='text-sm font-sans font-medium'>Profile Image</label>
                    <input type="file" onChange={uploadImage} name="profileImg" id="profileImg"  className='border border-gray-300 rounded-md p-2 outline-none' />


                    
                    <label htmlFor="coverImg" className='text-sm font-sans font-medium'>Cover Image</label>
                    <input type="file" onChange={uploadImage} name="coverImg" id="coverImg"  className='border border-gray-300 rounded-md p-2 outline-none' />

            </div>

            </form>

            <form action="" onSubmit={submitDataHandler}>
                <div className='flex flex-col gap-2 -mt-4 p-3'>
                    <label htmlFor="name" className='text-sm font-sans font-medium'>Name</label>
                    <input type="text" name="name" id="name" value={updatedData.name} onChange={onChangeHandler} className='border border-gray-300 rounded-md p-2 outline-none' />

                    <label htmlFor="bio" className='text-sm font-sans font-medium'>Bio</label>
                    <input type="text" name='bio' value={updatedData.bio} onChange={onChangeHandler} className='border border-gray-300 rounded-md p-2 outline-none' />

                    <label htmlFor="link" className='text-sm font-sans font-medium'>link</label>
                    <input type="text" name='link' value={updatedData.link} onChange={onChangeHandler} className='border border-gray-300 rounded-md p-2 outline-none' />

                     {
                        wait ? (
                            <div className='bg-blue-500 animate-pulse hover:bg-blue-700 duration-300 text-center text-white font-sans font-medium px-4 py-2 rounded-md'>Loading.....</div>
                        ) : (
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 duration-300 text-white font-sans font-medium px-4 py-2 rounded-md'>Update</button>
                        )
                     }
                  
                    </div>
            </form>


          
        </div>
    </div>
  )
}

export default EditProfile