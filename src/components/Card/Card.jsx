import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Card() {
  let { displayCart, deleteCart, updateCart, deleteUserCart } = useContext(CartContext);
  const [dataCart, setDataCart] = useState(null);

  async function display() {
    let { data } = await displayCart();
    setDataCart(data);
  }
  const delCart = useCallback(async (id) => {
    let { data } = await deleteCart(id);
    toast.loading('Removing Product From Cart');
    if (data?.status === 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success("Product Removed Successfully");
        display();
      }, 300);
    }
  }, []);

  const delAllCart = useCallback(async () => {
    let { data } = await deleteUserCart();
    toast.loading('Removing Cart');
    if (data?.message === 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success("Cart Removed Successfully");
        setDataCart(null);
      }, 300);
    }
  }, []);

  const update = useCallback(async (id, count) => {
    let { data } = await updateCart(id, count);
    toast.loading('Updating Product');
    if (data?.status === 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success("Product Updated Successfully");
        display();
      }, 600);
    }
  }, []);

  useEffect(() => {
    display();
  }, []);

  const cartProducts = useMemo(() => dataCart?.data?.products || [], [dataCart]);

  return (
    <>
      {cartProducts.length > 0 ? (
        <div className="relative overflow-x-auto w-[90%] m-auto shadow-md sm:rounded-lg">
          <h1 className='mb-7 text-teal-700 col-span-12'>My Cart</h1>

          {cartProducts.map((product) => (
            <div key={product.product.id} className="flex flex-wrap items-center p-3 justify-between">
              <div className="w-[100%] lg:w-[55%] flex flex-nowrap items-center">
                <div className="w-[35%] md:w-[15%] lg:w-[20%]">
                  <img loading='lazy' src={product.product.imageCover} alt={product.product.title} />
                </div>
                <p className='pl-14 font-medium'>{product.product.title}</p>
              </div>
              <div className="flex w-[100%] lg:w-[40%] p-3 justify-between items-center">
                <p className='font-medium'>{product.price} EGP</p>
                <div className="flex items-center">
                  <button onClick={() => update(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 border border-gray-300 rounded-full hover:bg-gray-100">
                    <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" /></svg>
                  </button>
                  <span>{product.count}</span>
                  <button onClick={() => update(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-full hover:bg-gray-100">
                    <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" /></svg>
                  </button>
                </div>
                <button onClick={() => delCart(product.product.id)} className="font-medium text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          ))}

          <p className='text-start px-5 pt-5 font-bold'>Total Price: <span className='text-green-400'>{dataCart?.data?.totalCartPrice} EGP</span></p>
          <div className="flex px-5 justify-between">
            <Link to={'/checkout'} className='text-white'>
              <button className='my-4 bg-green-400'>Check Out</button>
            </Link>
            <button onClick={delAllCart} className='my-4 bg-red-600 text-white'>Delete Cart</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
          <span className="loader text-4xl" />
        </div>
      )}
    </>
  );
}
