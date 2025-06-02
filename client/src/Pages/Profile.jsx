import axios from "axios";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { FaArrowLeftLong, FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { FaLink } from "react-icons/fa6";
import PostSketelon from "../components/PostSketelon";
import FollowOrUnfollow from "../components/FollowOrUnfollow";

function Profile() {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const allPost = useSelector((state) => state.post.allPost);
  //const [id, setId] = useState(params?.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const location = useLocation();
 
  console.log(location.pathname.split('/')[2]);
  

  const id = location?.state?.userId || location.pathname.split('/')[2]

  console.log(id, "id from profile page");
  

  const [data, setData] = useState();

  const getUserProfile = async () => {
    setWait(true);
    const response = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/user/otherUser/${id}`,
      {
        withCredentials: true,
      }
    );
    setData(response.data.data);
    setWait(false);
  };

  

  
  const getUserPost = allPost.filter(data => data.userId._id === id)
   
  const userPost = [...getUserPost].reverse()
  
    
    
    
  

  const openEditProfileHandler = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    getUserProfile();
   
  }, [id ]);

  return (
    <div className="mt-[50px] md:mt-[0px] lg:mt:[0px] flex flex-col min-h-screen py-2">
      {wait ? (
        <div className="flex justify-center items-start mt-[100px] h-screen w-full">
          <p className="font-sans font-medium animate-pulse">Uploading...</p>
        </div>
      ) : (
        <div>
          <div className="flex px-5 justify-start items-center gap-4 ">
            <Link
              to={"/"}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 duration-300"
            >
              <FaArrowLeftLong size={25} className="text-slate-900" />
            </Link>
            <div className="flex  flex-col">
              <h1 className="font-sans font-medium text-lg">{data?.name}</h1>
              <p className="font-sans font-medium ">
                {data?.userPost.length} post
              </p>
            </div>
          </div>

          <div className="w-[90%] mx-auto mt-3 h-[150px] bg-gray-200 rounded-lg">
            <div className="h-full w-full  ">
              {data?.coverImg ? (
                <img
                  src={data?.coverImg}
                  alt=""
                  className="h-full w-full border-2 border-gray-800 rounded-lg"
                />
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <h1 className="font-sans font-medium lext-lg">
                    No Cover Image
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="w-[70px] h-[70px] absolute top-[234px] md:top-[187px] lg:top-[187px] ml-6 md:ml-8 lg:ml-10 border-2 border-slate-800 rounded-full bg-gray-200">
            {data?.profileImg ? (
              <img
                src={data?.profileImg}
                alt=""
                className="h-full w-full border-2 border-gray-800 rounded-full"
              />
            ) : (
              <FaRegCircleUser className="text-gray-400 w-full h-full " />
            )}
          </div>

          <div className="flex justify-end items-center">
            {user._id === data?._id ? (
              <button
                onClick={openEditProfileHandler}
                className="bg-blue-400 hover:bg-blue-700 duration-300 text-white font-sans font-medium px-4 py-2 rounded-md mt-2 mr-7"
              >
                Edit Profile
              </button>
            ) : (
              <button className="bg-blue-500  hover:bg-blue-700 duration-300 text-white font-sans font-medium px-4 py-2 rounded-md mt-2 mr-7">
                {/* {data?.followers?.includes(user._id) ? "Unfollow" : "Follow"} */}
                {
                  <FollowOrUnfollow userdata={data} />
                }
              </button>
            )}
          </div>
        </div>
      )}

      {
        wait ? (""):(
          <div>
        <div className="flex  items-center ml-6 mt-7">
          <h1 className="text-xl font-sans  font-bold">{data?.name}</h1>
        </div>
        <div className="flex  items-center ml-6 mt-1">
          <h3 className="text-lg font-sans font-semibold text-gray-600">
            @{data?.username}
          </h3>
        </div>

        <div className="flex  items-center ml-6 mt-1">
          <div className="text-lg font-sans  text-gray-800">{data?.bio}</div>
        </div>

        <div className="flex  items-center gap-1 ml-6 mt-1">
          <FaLink className="text-gray-600" />
          <a
            className="text-blue-500 font-sans text-lg"
            href={`http://www.${data?.link}`}
          >
            {data?.link}
          </a>
        </div>

        <div className="flex  items-center gap-1 ml-6 mt-1">
          <h1 className="text-lg font-sans font-semibold text-gray-600">
            {data?.followers?.length} followers
          </h1>
          <h1 className="text-lg font-sans font-semibold text-gray-600 ml-2">
            {data?.following?.length} following
          </h1>
        </div>

        <div className="flex  items-center gap-1  border-b-2 border-gray-400 mt-1">
          <h1 className="text-lg ml-6 mb-1 font-sans font-bold">All Posts</h1>
        </div>

        {getUserPost?.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="font-sans font-medium text-lg">No Post Yet</h1>
          </div>
        ) : (
          <div>
            {getUserPost?.map((data, index) => {
              return (
                <div className="h-full w-full" key={data + index}>
                  <PostSketelon data={data} />
                </div>
              );
            })}
          </div>
        )}
      </div>

        )
      }
      {openEdit && (
        <EditProfile
          getUserProfile={getUserProfile}
          openEditProfileHandler={openEditProfileHandler}
          data={data}
        />
      )}
    </div>
  );
}

export default Profile;
