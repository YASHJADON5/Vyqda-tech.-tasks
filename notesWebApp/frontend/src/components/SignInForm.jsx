import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import spinner from '../assets/spinner.svg'

const Base_Url = import.meta.env.VITE_BASE_URL;

const Basic = () => {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)
  const [userFound,setUserNotFound]= useState(false)



  if(loading){
    return <div className='absolute inset-0 bg-white flex justify-center items-center '><img src={spinner} alt="" /></div>
  }

  return (
    <div className='h-screen w-screen bg-[#6A8785] flex justify-center '>
      <div className='bg-white p-8  shadow-lg w-9/10 md:w-1/3 h-3/5 md:h-3/4 rounded-md'>
        <h1 className=' mb-4 text-center text-3xl'>Sign in</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const response = await axios.post(`${Base_Url}/api/v1/signin`, values);
              console.log(response.data);
              if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/notes'); 
              }
              else if(response.data.msg==="User not found"){
                setUserNotFound(true);
              }
            } catch (err) {
                console.log("YASH")
              console.log('error', err);
              
            } finally {
              setLoading(false); 
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label htmlFor="email" className='mb-2 font-semibold'>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className='border border-gray-300 rounded mb-4 p-2'
              />
              {errors.email && touched.email && (
                <div className='text-red-500 mb-4'>{errors.email}</div>
              )}
              <label htmlFor="password" className='mb-2 font-semibold'>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className='border border-gray-300 rounded mb-4 p-2'
              />
              {errors.password && touched.password && (
                <div className='text-red-500 mb-4'>{errors.password}</div>
              )}
              {userFound&&<p className='text-red-500 mb-4'>User not found</p>}
              <Link to={'/signup'} className='text-center py-3'>Don't have an account <span className='underline text-blue-600'>Sign Up</span></Link>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className='bg-blue-500 text-white py-2 px-4 w-1/2 mx-auto rounded'
              >Sign In
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Basic;
