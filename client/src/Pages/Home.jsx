import React from "react";
import LeftSideBar from "../components/leftSideBar";
import { Outlet } from "react-router";
import RightSideBar from "../components/rightSideBar";
import UserMenu from "../components/UserMenu";

function Home() {
  return (
    <div className=" flex flex-col items-center">
      <div className=" fixed ">
        <UserMenu />
      </div>
      <div className="flex justify-between  w-full lg:w-[80%] md:w-[95%] mx-auto">
      

     

     <LeftSideBar />
    
    
        <div className="  w-[100%] md:w-[45%] lg:w-[45%] min-h-screen  md:border-2 border-gray-300">
          <Outlet />
        </div>
     
        <RightSideBar />
        
      </div>
    </div>
  );
}

export default Home;
