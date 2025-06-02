import React, { useEffect } from 'react'

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserData } from './Store/authSlice';
import Login from './Pages/Login';
import { Navigate, Route, Routes } from 'react-router';
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import ForYou from './Pages/ForYou'
import Following from './Pages/Following';
import Profile from './Pages/Profile'
import Notification from './Pages/Notification'
import Register from './Pages/Register';
import { getAllFollowingsPost, getAllPost } from './Store/postSlice';


function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   
   
   
   
   const dispatch = useDispatch()
   const getUser = ()=>{
    dispatch(getUserData())
   }

   const getAllPostData =()=>{
    dispatch(getAllPost())
   }

   const getAllFollowingPosts =()=>{
    dispatch(getAllFollowingsPost())
   }

   const getAllUsersData=()=>{
       dispatch(getAllUsers())
   }

   useEffect(()=>{
    getUser()
   getAllPostData()
    getAllFollowingPosts()
    getAllUsersData()
   },[getUser, getAllFollowingsPost, getAllPostData  ])
  
  return (
    <>
    <Routes>
         <Route path='/' element={isAuthenticated ?  <Home/>: <Navigate to={'/login'}/>}>
             <Route path='/' element={isAuthenticated ? <Feed/>: <Navigate to={'/login'}/>}>
               <Route path='/' element={isAuthenticated ? <ForYou/>:<Navigate to={'/login'}/> }/>
               <Route path='/following' element={isAuthenticated ? <Following/>: <Navigate to={'/login'}/>}/>
             </Route>
             <Route path='/profile/:id' element={isAuthenticated? <Profile/>: <Navigate to={'/login'}/> }/>
             <Route path='notification'  element={isAuthenticated ? <Notification/>: <Navigate to={'/login'}/>}/>
         </Route>

         <Route path='/login' element={!isAuthenticated ? <Login/> : <Navigate to={'/'}/>}/>
         <Route path='/register' element={!isAuthenticated ? <Register/>: <Navigate to={'/'}/>}/>
    </Routes>
    </>
  )
}

export default App