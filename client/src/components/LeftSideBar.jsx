import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo2.png";
import { TiHome } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logOutUser } from "../Store/authSlice";
import toast from "react-hot-toast";
import { FaRegCircleUser } from "react-icons/fa6";

function LeftSideBar() {
  const user = useSelector((state) => state.auth.user);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
      dispatch(logOutUser()).then((data)=>{
       
        if(data.payload.success){
          toast.success(data.payload.message)
          navigate('/login')
        }
        else{
          toast.error(data.payload.message)
        }
        
      })
  }


  
   const redirectToProfile = () => {
     
       
            navigate(`/profile/${user._id}`,{
                state: {
                    userId: user._id,
                   
                }
            })
    }

  return (
    <div className=" lg:block  md:block hidden w-[25%]   ">
      <div className=" flex flex-col fixed   ">
        <Link to={"/"} className="flex justify-start p-3 items-center">
          <img src={logo} alt="" className="h-[50px] w-[50px]" />
        </Link>
        <div className="flex flex-col w-full justify-start items-start ml-4 ">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex justify-start items-center gap-2  w-full  mt-2 rounded-md p-1   ${
                isActive ? "bg-blue-400 text-white" : "bg-gray-200"
              }`
            }
          >
            <TiHome size={33} className="" />
            <h1 className="text-xl font-sans font-bold ">Home</h1>
          </NavLink>

          <NavLink
            to={"/notification"}
            className={({ isActive }) =>
              `flex justify-start items-center gap-2 w-full mt-2 rounded-md p-1   ${
                isActive ? "bg-blue-400 text-white" : "bg-gray-200"
              }`
            }
          >
            <IoNotifications size={32} className=" " />
            <h1 className="text-lg font-sans font-bold text-ellipsis ">
              Notification
            </h1>
          </NavLink>

          <NavLink
            to={`/profile/${user._id}`}
            onClick={redirectToProfile}
            className={({ isActive }) =>
              `flex justify-start items-center gap-2 w-full mt-2 rounded-md p-1   ${
                isActive ? "bg-blue-400 text-white" : "bg-gray-200"
              }`
            }
          >
            <FaUser size={30} className="" />
            <h1 onClick={redirectToProfile} className="text-xl font-sans font-bold ">Profile</h1>
          </NavLink>
        </div>
      </div>

   <div className="flex ml-4 fixed justify-start gap-2 items-center mt-[550px]">
      
       <Link to={`/profile/${user._id}`} className="h-[40px] w-[40px] rounded-full ">
                   {
                    user.profileImg ? (
                       <img src={user.profileImg} alt=""  className="h-full w-full border-2 border-gray-800 rounded-full"/>
                    ):(
                     <FaRegCircleUser  className="text-gray-400 h-[30px] w-[30px] mt-2 "/>
                    )
                   }
        </Link>

      <Link  to={`/profile/${user._id}`}
      onClick={redirectToProfile} className="flex flex-col justify-start items-start">
      <h1 className="text-lg  font-sans w-[80px] text-ellipsis font-bold overflow-hidden text-gray-700 mt-2">
        {user?.username}
      </h1>
      </Link>
     
     <RiLogoutBoxRLine size={25} className="text-gray-700 cursor-pointer hover:text-red-500 mt-1" onClick={logOutHandler} />
   </div>

    </div>
  );
}

export default LeftSideBar;
