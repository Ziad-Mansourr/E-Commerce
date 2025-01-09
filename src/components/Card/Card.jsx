import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/CartContext'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Card() {
  let { displayCart, deleteCart, updateCart } = useContext(CartContext);
  const [dataCart, setDataCart] = useState(null);
  let count = 0;
  async function display() {
    let { data } = await displayCart();
    setDataCart(data);

  }
  async function delCart(id) {
    let { data } = await deleteCart(id);
    toast.loading('Removing Product From Cart');
    if (data?.status == 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success("Product Removed Successfully")
      }, 600)
    }
  }
  async function update(id, count) {
    let { data } = await updateCart(id, count);
    toast.loading('Updating Product');
    if (data?.status == 'success') {
      setTimeout(() => {
        toast.dismiss();
        toast.success("Product Updated Successfully")
      }, 600)
    }
    console.log(data);
  }

  useEffect(() => {
    display()
  }, [dataCart])
  return (
    <>
      {(dataCart?.data?.products?.length != null) ?
        <div className="relative overflow-x-auto w-[90%] m-auto shadow-md sm:rounded-lg">
           <h1 className='mb-7 text-teal-700 col-span-12'>My Cart</h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody >
              {dataCart?.data?.products?.map((product) => {
                return <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img loading='lazy' src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => update(product.product.id, (product.count) - 1)} className="bg-red-500  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <span>{product.count}</span>
                      <button onClick={() => update(product.product.id, (product.count) + 1)} className="bg-green-400  inline-flex  items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className=" w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    EGP{product.price}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => delCart(product.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
          <p className='text-start px-5 pt-5 font-bold'>Total Price : <span className='text-green-400'>{dataCart?.data?.totalCartPrice} EGP</span> </p>
          <Link to={'/checkout'} className='text-white '>
            <button className='my-4 bg-green-400 '>Check Out</button>
          </Link>

        </div>  
  :
  <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
    <span class="loader text-4xl"></span>
    </div>
  }
    </>
  )
}