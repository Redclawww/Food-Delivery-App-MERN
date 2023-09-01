import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export const Login = () => {
  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({
    email:'',
    password:''
});

const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
        method:'POST', 
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify({email:credentials.email,password: credentials.password,})
    });
    const json = await response.json();
    console.log(json);
    if(!json.success){
        alert("Enter Valid Credentials");
    }
    if(json.success){
   navigate('/');
   localStorage.setItem("authToken",json.authToken)
   localStorage.setItem("userEmail",credentials.email)
}
}

const onChange = async (event)=>{
    setCredentials({...credentials,
        [event.target.name]:event.target.value
    })
}
  return (
    <div>
       <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <Link to="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Food Costa
                        </h3>
                    </Link>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end mt-4">
                            <Link
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                to="/createuser"
                            >
                                Create New Account
                            </Link>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
  )
}
