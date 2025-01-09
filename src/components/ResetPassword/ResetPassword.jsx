import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yp from 'yup'
import axios from 'axios'
import { userContext } from '../../../Context/UesrContext'
export default function ResetPassword() {
  let navigate = useNavigate();
  const [apiError, setApi] = useState('');
  const [load, setLoad] = useState(false);
  let { setUserLogin } = useContext(userContext);
  let validationSchema = yp.object().shape({
    email: yp.string().email('email invalid').required('email is required'),
    newPassword: yp.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, 'password is invalid').required('password is required'),

  })
  //   let { setUserLogin } = useContext(userContext);
  const [eye, setEye] = useState(false);
  function showPass() {
    if (!eye) {
      setEye(true);
    } else {
      setEye(false);
    }
  }
  async function handleRegister(values) {
    setLoad(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then(
        (apiRes) => {
          console.log(apiRes.data);
          // localStorage.setItem('userInfo' ,JSON.stringify(apiRes.data));
          setLoad(false);
          navigate('/login');
          // window.location.reload();
          console.log(apiRes.data);

        }
      ).catch(
        (apiError) => {
          setLoad(false);
          setApi(apiError.response.data.message)
        }
      )
  }


  let formik = useFormik(
    {
      initialValues: {
        email: '',
        newPassword: '',
      },
      onSubmit: handleRegister,
      validationSchema: validationSchema
    }
  )

  return (
    <>
      <section className='w-[90%] text-start m-auto mt-8'>
        <h2 className='mb-5 text-3xl font-bold'><i className='fa-solid fa-lock mr-3 text-green-500'></i> Reset Password</h2>
        <form className="" onSubmit={formik.handleSubmit}>
          {apiError != '' ?
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span class="font-medium">{apiError}</span>
            </div>
            : null
          }


          <div className="relative z-0 w-full mb-10 group">
            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
            {formik.errors.email != null && formik.touched.email ?
              <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">{formik.errors.email}</span>
              </div> : null}
            <label htmlFor="email" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>

          <div className="relative z-0 w-full mb-10 group">
            <input type={eye ? "text" : "password"} name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
            <Link onClick={showPass} className='absolute top-3 right-2 p-0 '>
              {
                eye ?
                  <i className="fa-solid fa-eye hover:text-green-400 transition-all duration-200"></i>
                  :
                  <i className="fa-solid fa-eye-slash hover:text-green-400 transition-all duration-200"></i>
              }
            </Link>
            
            {formik.errors.newPassword != null && formik.touched.newPassword ?
              <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">{formik.errors.newPassword}</span>
              </div> : null}
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">new Password</label>
          </div>
          <div className="w-full justify-center items-center flex flex-col">
            <button type="submit" className="text-white text-md bg-green-500 hover:bg-green-700 transition-all  duration-200 font-medium rounded-lg  px-32    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {load ? <i className='fas fa-spinner fa-spin px-2' ></i> : 'Reset'}
            </button>

          </div>
        </form>
      </section>
    </>
  )
}
