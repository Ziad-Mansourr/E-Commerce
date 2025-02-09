import  { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yp from 'yup'
import { userContext } from '../../../Context/UesrContext'
import axiosInstance from '../../services/axiosInstance'
export default function UpdatePassword() {
  let navigate = useNavigate();
  const [apiError, setApi] = useState('');
  const [load, setLoad] = useState(false);

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
    function showPass(i){
      if(i == 0){
        if(!eye){
          setEye(true);   
        }else{
          setEye(false);    
        }
      }else if(i == 1){
        if(!eye1){
          setEye1(true);   
        }else{
          setEye1(false);    
        }
      }else{
        if(!eye2){
          setEye2(true);   
        }else{
          setEye2(false);    
        }
      }
   }


  let validationSchema = yp.object().shape({
    currentPassword: yp.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, 'Password is wrong').required('Current Password is required'),
    password: yp.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, 'Password should be start with capital letter and min length is 8 chars').required('password is required'),
    rePassword: yp.string().oneOf([yp.ref('password')], 'rePassword is invalid').required('rePassword is invalid')

  })
  let { setUserLogin } = useContext(userContext);
  let headers = {
    token: localStorage.getItem('userToken'),
}


  async function handleRegister(values) {
    setLoad(true)
    axiosInstance.put(`users/changeMyPassword`, values , {headers})
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
        currentPassword: '',
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
      <h2 className='mb-5 text-3xl font-bold'><i className='fa-solid fa-id-card mr-3 text-green-500'></i> Change password</h2>
      <form className="" onSubmit={formik.handleSubmit}>
        {apiError != '' ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>
          : null
        }

        <div className="relative z-0 w-full mb-10 group">
          <input type={eye?"text":"password"} name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <Link onClick={()=>showPass(0)} className='absolute top-3 right-2 p-0 '>
              {
                eye?
                <i className="fa-solid fa-eye hover:text-green-400 transition-all duration-200"></i>
                :
                <i className="fa-solid fa-eye-slash hover:text-green-400 transition-all duration-200"></i>
              }
          </Link>
          {formik.errors.currentPassword != null && formik.touched.currentPassword ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.currentPassword}</span>
            </div> : null}
          <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-xl rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Password</label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input type={eye1?"text":"password"} name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <Link onClick={()=>showPass(1)} className='absolute top-3 right-2 p-0 '>
              {
                eye1?
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
          <input type={eye2?"text":"password"} name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <Link onClick={()=>showPass(2)} className='absolute top-3 right-2 p-0 '>
              {
                eye2?
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
                  {load ? <i className='fas fa-spinner fa-spin px-2' ></i> : 'Change'}
                </button>
                </div>
      </form>
    </section>

    </>
  )
}
