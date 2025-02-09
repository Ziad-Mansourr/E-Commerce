import  { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { WishListContext } from '../../../Context/WishListContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../../Context/CartContext';
import axiosInstance from '../../services/axiosInstance';
export default function ProductDetailes() {
  let count = 0;
  let { id, category } = useParams();
  const { addToWishList, wish, deleteFromWish } = useContext(WishListContext);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay:true,
    autoplaySpeed: 1000,
  };
  const { addToCart } = useContext(CartContext);
  async function addWish(id) {
    let { data } = await addToWishList(id);
   
      toast.loading('Adding Product To WishList');
      setTimeout(()=>{
        if (data?.status == 'success') {
          toast.dismiss();
          toast.success(data?.message);
        }
      },800)
    }
    async function deleteWish(id) {
      let { data } = await deleteFromWish(id);
      toast.loading('Removing Product From WishList');
      setTimeout(()=>{
        if (data?.status == 'success') {
          toast.dismiss();
          toast.success(data?.message)
        }
      },800)
  }
  
  async function addCart(id) {
    let { data } = await addToCart(id);
    toast.loading('Adding Product To Cart');
    setTimeout(()=>{
      if (data.status == 'success') {
        toast.dismiss()
        toast.success(data?.message);
      }
    },800)
  }
  const [productDetailes, setProductDetailes] = useState([]);
  const [relatedProduct, setrelatedProduct] = useState([]);
  function getProductDetailes(id) {
    axiosInstance.get(`products/${id}`)
      .then(({ data }) => {
        setProductDetailes(data.data);


      }).catch((error) => {
          setProductDetailes(error);
      })
  }
  function getRelatedProduct(category) {
    axiosInstance.get(`products`)
      .then(({ data }) => {
        let allProduct = data.data
        let filterProduct = allProduct.filter((product) => product.category.name == category)
        setrelatedProduct(filterProduct);
      }).catch((error) => {
        setrelatedProduct(error);
      })
  }

  useEffect(() => {
    getProductDetailes(id);
    getRelatedProduct(category);
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 600);
  
    return () => clearTimeout(timeout);
  }, [id, category])


  return (
    <>
    {(relatedProduct?.length > 0)
    ?
    <>
      <div className="flex w-[90%] m-auto items-center flex-wrap md:flex-nowrap justify-start md:justify-between p-5">
        <div className="w-[100%] md:w-[30%] mb-8 shadow-md">
          {/* <img src= {productDetailes?.imageCover} className='w-full shadow-lg' alt="" /> */}
          <Slider {...settings} className='m-auto '>
            {productDetailes?.images?.map((src) => <img loading='lazy' key={count++} src={src} className='w-full ' alt="Product Image" />)}
          </Slider>

        </div>
        <div className="w-full pl-3 ml-3 text-start md:w-[70%] md:order-1">
          {/* <h3 className='text-green-400 pl-3 '>{productDetailes?.category?.name}</h3> */}
          <div className=" flex items-center mb-5">
            <h2 className='text-green-400  text-3xl'>{productDetailes.title}</h2>
            <div className="bg-slate-600 relative top-0 left-0 ">
            {(wish?.data != "") ? wish?.data?.map((products) => (products.id == id) ?
              <button key={id} onClick={() => deleteWish(id)}  className='z-10 absolute  transition-all duration-[.4s] -top-2 -right-10 p-0 bg-transparent'><i className="fa-solid fa-heart text-2xl  text-green-400" /> </button>
              :
              <button key={id} onClick={() => addWish(id)} className='absolute  transition-all duration-[.4s] -top-2 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
            )
              :
              <button onClick={() => addWish(id)} className='absolute  transition-all duration-[.4s] -top-2 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
            }
              {/* <button onClick={() => addWish(id)} className='   bg-transparent'> <i className="fa-regular fa-heart pt-2 text-3xl  text-green-400" /></button> */}
            </div>
          </div>
          <h2 className='text-gray-600'>{productDetailes.description}</h2>
          <div className="flex justify-between mb-3">
            <span className='pt-2 font-bold'>{productDetailes.price} EGP</span>
            <span className='p-2 mr-3'>{productDetailes.ratingsAverage} <i className='fa fa-star text-yellow-300' ></i></span>
          </div>
          <div className="flex justify-center">
            <button onClick={() => addCart(id)} className=' hover:bg-green-400 hover:text-white w-full lg:w-[40%] md:w-[60%]  transition-all duration-[0.4s] px-8 bg-transparent border-green-400 text-teal-700 mt-2'><i className="fa-solid fa-plus"></i> Add To Card</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 w-[90%] m-auto pt-7 ">
        <div className="col-span-12 flex justify-center">
        <h1 className=' text-4xl font-bold border-b-4 pb-5 text-center  border-b-green-500'>Related Product</h1>
        </div>
        {relatedProduct?.map((product) =>
          <div key={product.id} className="relative group col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  overflow-hidden  hover:scale-[1.059] duration-300 rounded-lg shadow-lg p-3 my-2 border-gray-400">
            <Link to={`/productDetailes/${product.id}/${product.category.name}`}>
              <img loading='lazy' src={product.imageCover} className='w-full' alt={product.title} />
            </Link>
            {(wish?.data != "") ? wish?.data?.map((products) => (products.id == product.id) ?
              <button onClick={() => deleteWish(product.id)} className='z-10 absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-solid fa-heart text-2xl  text-green-400" /> </button>
              :
              <button onClick={() => addWish(product.id)} className='absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
            )
              :
              <button onClick={() => addWish(product.id)}  className='absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
            }
            <h3 className='text-green-400 text-left px-2'  >{product.category.name}</h3>
            <h4 className='text-left px-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
            <div className="flex justify-between">
              <span className='p-2'>{product.price} EGP</span>
              <span className='p-2'>{product.ratingsAverage} <i className='fa fa-star text-yellow-300' ></i></span>
            </div>
            <button key={product.id} onClick={() => addCart(product.id)} className='relative hover:bg-green-400 hover:text-white top-[100px] group-hover:top-0 transition-all duration-[0.4s] text-sm md:text-base w-full bg-transparent border-green-400 text-teal-700 mt-2'><i className="fa-solid fa-plus"></i> Add To Card</button>
          </div>
        )}
      </div>
    </>
    :
    <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
   <span className="loader text-4xl" />

    </div>
    }

    </>
  )
}