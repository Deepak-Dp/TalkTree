import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import uploadFile from "../util/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { getAllPost } from "../Store/postSlice";
import { Link, useNavigate } from "react-router";


function CreatePost() {
  const user = useSelector((state) => state.auth.user);
  const [wait , setWait] = useState(false)
  const [image, setImage] = useState()
  const [text, setText] = useState()
  const [waitPost, setWaitPost] = useState(false)

  const dispatch = useDispatch()
   
   
   const getAllPostData =()=>{
      dispatch(getAllPost())
     }

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    setWait(true);
    const image = await uploadFile(file);
    setWait(false);
    console.log(image);
    setImage(image)
  };


  const postHandler = async() => {
      const data = {
        image: image,
        text: text
      }
      setWaitPost(true)
    const response = await axios.post("http://localhost:5000/api/v1/post/create-post",data,{
      withCredentials:true
    })
    

    if (response?.data?.success) {
       toast.success(response?.data?.message)
       setImage('')
       setText('')
       getAllPostData()
    } else{
      toast.error(response?.data?.message)
    }

    setWaitPost(false)
    
  }

  const navigate = useNavigate();

  
    const redirectToProfile = () => {
       
            navigate(`/profile/${user._id}`,{
                state: {
                    userId: user._id,
                   
                }})
         
    }
  

  

  return <div className=" w-full h-full border-b-2 border-gray-300">
    
    <div className="flex justify-start  p-2 gap-2">
       <div onClick={redirectToProfile} className="h-[45px] w-[45px] rounded-full ">
             {
              user.profileImg ? (
                 <img src={user.profileImg} alt=""  className="h-full w-full border-2 border-gray-800 rounded-full"/>
              ):(
               <FaRegCircleUser size={40} className="text-gray-400 "/>
              )
             }
       </div>

     <textarea value={text} onChange={
      (e) => setText(e.target.value)
     } placeholder="What's Happening?" rows={4} cols={30} className="outline-none overflow-hidden resize-none  font-sans font-semibold text-gray-700"/>
    
   
    
    </div>
 <div className=" border-b-2 border-gray-300 flex justify-center items-center pb-3 ">
  {
      image && (
        <div className=" w-[150px] h-[150px] border-2 border-gray-300 rounded-md">
           <img src={image} alt="" className="h-full w-full rounded-md" />
        </div>
      )
    }
 </div>
  
    <div className="flex justify-between px-5 mt-1 items-center">
         <form action="">
       {
        wait ? (
          <div className="animate-bounce font-sans font-medium text-blue-600">Loading.....</div>
        ): (
          <label htmlFor="image">
          <FaRegImage size={20} className="text-blue-700 cursor-pointer"/>
          </label>
        )
       }


         <input type="file" onChange={uploadImageHandler} id="image" className=" hidden" />
         </form>
          <button disabled={!text && !image}  onClick={postHandler} className="py-[2px] px-[20px] bg-blue-500 duration-200 hover:bg-blue-700 text-white font-sans
           font-medium text-lg mb-1 rounded-md">{waitPost ? "Uploading..": "Post"}</button>
     </div>
  </div>;
}

export default CreatePost;
