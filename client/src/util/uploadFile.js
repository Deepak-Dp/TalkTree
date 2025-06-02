import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const uploadFile = async (image) =>{
    const formData = new FormData();
    formData.append("file", image);
    
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/image-upload",
      formData,
      {
        withCredentials: true,
      }
    );
   

   
    
    if (response?.data?.success) {
     
      toast.success(response.data.message);
      
      return response?.data?.data
    } 

}

export default uploadFile