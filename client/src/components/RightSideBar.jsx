import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowOrUnfollow from "./FollowOrUnfollow";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import FindUserSketelon from "./FindUserSketelon";
import axios from "axios";

function RightSideBar() {
  const suggesUser = useSelector((state) => state.auth.getAllUsers);
  const user = useSelector((state) => state.auth.user);
  const [text, setSearchUser] = useState("");
  const [allUser, setAllUser] = useState([]);



  const [openSarchBox, setOpenSarchBox] = useState(false);

  const handleSearchBox = () => {
    setOpenSarchBox(!openSarchBox);
  };


  const searchUserHandler = async() => {
    
     const response = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/user/getAllUser`,
      {
        withCredentials: true,
      }
    );
   
    setAllUser(response.data.data)
    };

     

     const filteredUsers = allUser.filter((user) => {
    return (
      user.name.toLowerCase().includes(text.toLowerCase()) ||
      user.username.toLowerCase().includes(text.toLowerCase())
    )
     })

    
     

  useEffect(() => {
    searchUserHandler();
  }, []);

  return (
    <div className=" lg:block md:block hidden w-[30%]">
     <div className="fixed">
       {openSarchBox ? (
        <div className=" h-[40px] w-[100%] ml-2  mx-auto mt-2 shadow-md bg-gray-100 rounded-lg  cursor-pointer flex items-center justify-between">
          <input
            type="text"
            onClick={searchUserHandler}
            value={text}
            onChange={(e) => setSearchUser(e.target.value)}
            className="outline-none bg-gray-100 font-sans ml-4 w-[70%] font-normal text-lg"
            placeholder="search"
          />
          <IoClose
            onClick={handleSearchBox}
            size={20}
            className="mr-3 font-bold text-gray-400 cursor-pointer"
          />
        </div>
      ) : (
        <div
          onClick={handleSearchBox}
          className=" h-[40px] w-[100%] ml-2 gap-3 mx-auto mt-2 shadow-md bg-gray-100 rounded-lg  cursor-pointer flex items-center justify-start"
        >
          <IoSearch size={20} className="ml-3 font-bold text-gray-400" />
          <input
            type="text"
            className="outline-none w-[70%] bg-gray-100 font-sans font-normal text-lg"
            placeholder="search"
          />
        </div>
      )}

      <div className="w-[100%] mx-auto mt-4 ml-2 bg-gray-100  shadow-md rounded-lg">
        <h1 className=" text-lg font-sans font-semibold ml-4 pt-2  text-gray-500">
          Who to follow
        </h1>

        {openSarchBox ? (
          <div className=" w-[97%] overflow-y-auto max-h-[600px]  scrollbar  mx-auto mt-2   rounded-lg  cursor-pointer ml-1">
           {
            filteredUsers.length > 0 ? (
              filteredUsers.map((data, index) => {
                return (
                  <div key={data + index} className="mb-4">
                    <FindUserSketelon data={data} />
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 mb-3 mt-3 font-sans font-semibold text-lg">No users found</p>
            )
           }
          </div>
        ) : (
          <div className=" w-[97%] overflow-y-auto max-h-[600px]  scrollbar  mx-auto mt-2   rounded-lg  cursor-pointer ml-1">
            {suggesUser?.map((data, index) => {
              return (
                <div key={data + index} className="mb-4" >
                  <FindUserSketelon data={data} />
                </div>
              );
            })}
          </div>
        )}
      </div>
     </div>
    </div>
  );
}

export default RightSideBar;
