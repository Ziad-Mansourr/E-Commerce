import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yp from 'yup'
import axios from 'axios'
import { userContext } from '../../../Context/UesrContext'
export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApi] = useState('');
  const [load, setLoad] = useState(false);
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
    function showPass(i){
      if(i == 0){
        if(!eye){
          setEye(true);   
        }else{
          setEye(false);    
        }
      }else{
        if(!eye1){
          setEye1(true);   
        }else{
          setEye1(false);    
        }
      }
   }
  let validationSchema = yp.object().shape({
    name: yp.string().min(3, 'name minlengh is 3').max(11, 'name maxlengh is 11').required('name is required'),
    email: yp.string().email('email invalid').required('email is required'),
    phone: yp.string().matches(/^01[0125][0-9]{8}$/, 'phone is invalid').required('phone is required'),
    password: yp.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, 'Password should be start with capital letter and min length is 8 chars').required('password is required'),
    rePassword: yp.string().oneOf([yp.ref('password')], 'rePassword is invalid').required('rePassword is invalid')

  })
  let { setUserLogin } = useContext(userContext);

  async function handleRegister(values) {
    setLoad(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then(
        (apiRes) => {
          localStorage.setItem('userToken', apiRes.data.token);
          localStorage.setItem('userInfo' ,JSON.stringify(apiRes.data));
          setUserLogin(apiRes.data.token);
          setLoad(false);
          navigate('/');
          window.location.reload();
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
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
      },
      onSubmit: handleRegister,
      validationSchema: validationSchema
    }
  )

  return (
    <>
    <section className='md:w-[50%] w-[90%] text-start m-auto mt-8'>
      <h2 className='mb-5 text-3xl font-bold'><i className='fa-solid fa-id-card mr-3 text-green-500'></i> Register</h2>
      <form className="" onSubmit={formik.handleSubmit}>
        {apiError != '' ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>
          : null
        }

        <div className="relative z-0 w-full mb-10 group">
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          {formik.errors.name != null && formik.touched.name ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.name}</span>
            </div> : null}
          <label htmlFor="name" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          {formik.errors.email != null && formik.touched.email ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : null}
          <label htmlFor="email" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          {formik.errors.phone != null && formik.touched.phone ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div> : null}
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input type={eye?"text":"password"} name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <Link onClick={()=>showPass(0)} className='absolute top-3 right-2 p-0 '>
              {
                eye?
                <i className="fa-solid fa-eye hover:text-green-400 transition-all duration-200"></i>
                :
                <i className="fa-solid fa-eye-slash hover:text-green-400 transition-all duration-200"></i>
              }
          </Link>
          {formik.errors.password != null && formik.touched.password ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div> : null}
          <label htmlFor="password" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input type={eye1?"text":"password"} name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <Link onClick={()=>showPass(1)} className='absolute top-3 right-2 p-0 '>
              {
                eye1?
                <i className="fa-solid fa-eye hover:text-green-400 transition-all duration-200"></i>
                :
                <i className="fa-solid fa-eye-slash hover:text-green-400 transition-all duration-200"></i>
              }
          </Link>
          {formik.errors.rePassword != null && formik.touched.rePassword ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div> : null}
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
        </div>
        <div className="w-full justify-center items-center flex flex-col">
                <button type="submit" className="text-white text-md bg-green-500 hover:bg-green-700 transition-all  duration-200 font-medium rounded-lg  px-32    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {load ? <i className='fas fa-spinner fa-spin px-2' ></i> : 'Sign Up'}
                </button>
                <div className="mt-8">
                <p className='py-2'>You have an account <Link  to={'/login'}>Login Now</Link></p>
                </div>
                </div>
      </form>
    </section>

    </>
  )
}
