import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate} from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { getUserData } from "../Store/authSlice";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [wait, setWait] = useState(false);


 const navigate = useNavigate()

  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setWait(true);
    const response = await axios.post("http://localhost:5000/api/v1/user/login", data,{
      withCredentials: true
    })


    if (response.data.success) {
       toast.success(response.data.message)

       dispatch(getUserData()).then((data)=>{
         console.log(data);
         
       })
        navigate('/')
    } else {
      toast.error(response.data.message)
    }
    setWait(false);
   
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row h-screen w-full bg-black">
      <div className="md:w-[50%] lg:w-[50%]  h-[350px] md:h-full lg:h-full  flex flex-col justify-center items-center">
        <img
          src={logo}
          alt=""
          className=" w-[100px] h-[100px] md:w-[300px] md:h-[300px]"
        />
        <h1 className=" text-white text-lg md:text-xl lg:text-xl font-sans font-bold">
          Welcome to TalkTree
        </h1>
      </div>
      <div className="md:w-[50%] lg:w-[50%] h-full text-white flex justify-center md:justify-start lg:justify-start items-center  ">
        <div className="p-6 flex flex-col ">
          <h1 className="text-2xl font-sans font-bold ">Happening now.</h1>
          <h3 className=" text-lg font-sans font-bold">Login</h3>

          <form
            action=""
            onSubmit={onSubmitHandler}
            className=" w-[230px] mt-3 "
          >
            <div className=" w-full mt-3">
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={onchangeHandler}
                placeholder="Enter Your Email "
                className="w-full outline-none bg-gray-200 rounded-xl h-[35px] pl-1 text-lg text-black border-2 border-gray-200"
              />
            </div>

            <div className=" w-full mt-3">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={onchangeHandler}
                placeholder="Enter Your password "
                className="w-full outline-none bg-gray-200 rounded-xl h-[35px] pl-1 text-lg text-black border-2 border-gray-200"
              />
            </div>

            <button className=" w-full text-lg mt-3 border-2 border-blue-700 rounded-xl bg-blue-500 hover:bg-blue-700 font-sans font-bold">
              {wait ? (
               'please wait...'
              ) : (
                "Login"
              )}
             
            </button>
          </form>
          <p className="mt-3 font-sans font-medium">
            Don't have any Account?{" "}
            <Link to={"/register"} className=" text-blue-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
