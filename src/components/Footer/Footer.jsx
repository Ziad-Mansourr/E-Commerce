import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer className='grid grid-cols-12 w-[90%] m-auto py-5'>
        <div className="col-span-12">
          <h1>Get Fresh cart App</h1>
          <p className='pt-2 pb-4 text-lg text-gray-400'>we will send to you download link , open it and download App</p>
          <div className="flex justify-between">
            <div className="mb-5 w-[88%]">
              <input type="text" id="share" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="">
            <button type="button" className=" text-white bg-green-500 hover:bg-green-800  font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2">Share App Link</button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex w-1/2 gap-2 items-center">
              <h2 className='font-bold'>Payment Methods :</h2>
              <img src="master-D--evCMi.jpg" className='w-[14%]' alt="" />
              <img src="download.png" className='w-[14%]' alt="" />
              <img src="amazon-BcHVa_T1.jpg" className='w-[14%]' alt="" />
            </div>
            <Link to={'https://play.google.com/store/games?hl=en&pli=1'} target='_blank' className='flex items-center justify-end pr-2'>
              <h2 className='font-bold'>Get App Now On</h2>
              <img src="appstore-CZUftfcT.webp" className='w-[10%]' alt="" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
