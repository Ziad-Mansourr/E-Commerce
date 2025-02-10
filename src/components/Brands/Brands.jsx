import { Link } from 'react-router-dom';
import useBrands from '../Hooks/useBrands';
import { useMemo } from 'react';
export default function Brands() {
  let { data, isLoading } = useBrands();
  const brandList = useMemo(() => {
    return data?.data?.data || [];
  }, [data]);
  
  if (isLoading) {
    return <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
      <span className="loader text-4xl" />
    </div>
  }
  
  return (
    <>
      <div className="grid grid-cols-12 gap-5 w-[90%] m-auto">

        {brandList?.map((product) =>
          <div key={product._id} className="col-span-6 p-3 md:col-span-4 group relative lg:col-span-3 xl:col-span-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img loading='lazy' className="rounded-lg h-[120px]  w-full" src={product.image} alt={product.name}/>
            <Link to={`/brandsDetails/${product._id}/${product.slug}`}>
              <button className='pt-2 relative top-[150px] transition-all text-white duration-[.3s] group-hover:top-2  bg-green-400 w-full'>Show</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
