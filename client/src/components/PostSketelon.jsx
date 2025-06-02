import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { timeSince } from "../util/data";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import {
  getAllFollowingsPost,
  getAllPost,
  likeOrUnlike,
} from "../Store/postSlice";
import { Link, useNavigate } from "react-router";

function PostSketelon(data) {
  const user = useSelector((state) => state.auth.user);
  const [openComment, setOpenComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const commentData = [...data?.data?.comments].reverse();

  const profileId = data.data.userId._id
  


  const dispatch = useDispatch();

  const getAllPostData = () => {
    dispatch(getAllPost());
  };

  const getAllFollowingPosts = () => {
    dispatch(getAllFollowingsPost());
  };

  const likeOrDisLikeHandler = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/v1/post/like-post/${data.data._id}`,
      { userId: user._id }
    );

    if (response.data.success) {
      dispatch(likeOrUnlike({ postId: data.data._id, userId: user._id }));
    }
  };


  const deletePostHandler = async () => { 
       console.log("delete post handler", data.data._id);
    const response = await axios.delete(
      `http://localhost:5000/api/v1/post/delete-post/${data.data._id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      getAllPostData();
      getAllFollowingPosts();
    } else {
      toast.error(response.data.message);
    }
       
  }
  
  const openCommentHandler = () => {
    setOpenComment(!openComment);
  };

  const commentHandler = async () => {
    if (!commentText) {
      toast.error("Please add a comment");
      return;
    }

    const response = await axios.post(
      `http://localhost:5000/api/v1/post/comment/${data.data._id}`,
      { text: commentText },
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      setCommentText("");

      getAllPostData();
      getAllFollowingPosts();

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };


  const navigate = useNavigate()

  const redirectToProfile = () => {
       
       
            navigate(`/profile/${profileId}`,{
                state: {
                    userId: profileId,
                   
                }
            })
    }

  return (
    <div className=" h-full flex flex-col p-3">
      <div  onClick={redirectToProfile}  className="flex justify-between items-center gap-1">
      <div onClick={redirectToProfile} className="flex justify-start items-center gap-1">
        <div className="h-[30px] w-[30px] rounded-full ">
          {data?.data?.userId?.profileImg ? (
            <img
              src={data?.data?.userId?.profileImg}
              alt=""
              className="h-full w-full border-2 border-gray-800 rounded-full"
            />
          ) : (
            <FaRegCircleUser size={30} className="text-gray-400 " />
          )}
        </div>

        <p className="hidden md:block  lg:block  overflow-hidden">
          {data.data.userId.name}
        </p>
        <p className="text-gray-600">@{data.data.userId.username}</p>
        <p className="text-gray-600  text-ellipsis line-clamp-1 overflow-hidden">
          {timeSince(data.data.createdAt)}
        </p>
        </div>

        <div>
          {
            data.data.userId._id === user._id && (
              <div>
                  <MdOutlineDelete onClick={deletePostHandler} size={25} className="text-red-400 hover:text-red-800 duration-200 cursor-pointer"/>
              </div>
            )
          }
        </div>
      </div>

     

      <div className="flex justify-start  items-center mt-2">
        <div className="px-10 text-gray-800">{data?.data?.text}</div>
      </div>

      <div className="flex justify-center items-center border-b-2 border-gray-300  mt-2">
        {data?.data?.image && (
          <div className="h-[300px] w-[250px] rounded-md mb-3 ">
            {data?.data?.image && (
              <img
                src={data?.data?.image}
                alt=""
                className="h-full w-full border-2  border-gray-800 rounded-md"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-evenly items-center border-b-2 border-gray-300 py-2">
        <div className="flex justify-center items-center gap-1">
          {data.data.like.includes(user._id) ? (
            <div onClick={likeOrDisLikeHandler}>
              {" "}
              <IoHeartSharp size={25} className="text-red-500 cursor-pointer" />
            </div>
          ) : (
            <div onClick={likeOrDisLikeHandler}>
              <IoHeartOutline
                size={25}
                className="text-gray-500 cursor-pointer"
              />
            </div>
          )}
          <span className="font-sans font-medium">
            {data?.data?.like?.length}
          </span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <FaRegCommentDots
            onClick={openCommentHandler}
            size={23}
            className="text-gray-500 cursor-pointer"
          />
          <span className="font-sans font-medium">
            {data?.data?.comments?.length}
          </span>
        </div>
        <div>
          <MdOutlineBookmarkBorder
            size={25}
            className="text-gray-500 cursor-pointer"
          />
        </div>
      </div>

      {openComment && (
        <div className="flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-gray-200/50 h-full w-full fixed ">
          <div className="h-[550px] w-[90%] md:w-[400px] md:ml-[-90px] lg:ml-[-115px] lg:w-[400px] bg-white rounded-md shadow-md flex flex-col ">
            <div className="px-4 flex justify-between items-start  w-full  py-2">
              <p className="text-gray-800 font-sans text-lg font-medium">
                Comments
              </p>
              <p
                onClick={openCommentHandler}
                className=" text-lg font-bold text-red-500 hover:text-red-700 duration-300 cursor-pointer"
              >
                X
              </p>
            </div>

            <div className="h-[400px] border-b-2 border-gray-300 w-full overflow-y-auto scrollbar">
              {!data?.data?.comments.length > 0 ? (
                <div className="flex justify-center items-center h-full w-full">
                  <p className="text-gray-500 text-lg font-sans font-medium">
                    No comments yet
                  </p>
                </div>
              ) : (
                <div>
                  {commentData.map((data, index) => {
                    return (
                     <div className="flex flex-col border-b-2 border-gray-300 w-full" key={index}>
                       <div
                        className="flex justify-start items-center gap-2 md:px-10 lg:px-10 px-3 py-2"
                        key={index}
                      >
                        <div className="h-[35px] w-[35px] rounded-full ">
                          {data?.image ? (
                            <img
                              src={data?.image}
                              alt=""
                              className="h-full w-full border-2 border-gray-800 rounded-full"
                            />
                          ) : (
                            <FaRegCircleUser
                              size={30}
                              className="text-gray-400 "
                            />
                          )}
                        </div>
                        <p className="text-gray-800 font-sans font-medium">
                          {data.name}
                        </p>
                        <p className="text-gray-600">@{data.username}</p>
                      </div>
                      <div className="flex justify-start  items-center px-10 py-2">
                        <pre className="text-gray-800 h-full w-full text-balance ">{data.text}</pre>
                        </div>
                      
                     </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-start justify-start gap-2 px-4 py-2">
              <div className="h-[35px] w-[35px] rounded-full ">
                {user?.profileImg ? (
                  <img
                    src={user?.profileImg}
                    alt=""
                    className="h-full w-full border-2 border-gray-800 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser size={30} className="text-gray-400 " />
                )}
              </div>
              <textarea
                rows={1}
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="h-[38px] w-full border-2 resize-none border-gray-300 rounded-md px-2 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex justify-center items-center w-full px-4 py-2">
              <button
                onClick={commentHandler}
                className="h-[40px] w-full bg-gray-800 text-white font-sans font-medium rounded-md hover:bg-gray-900 duration-300"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostSketelon;
