import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
    <footer className=" bg-[#000] mt-7">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0">
                <img src="https://storage.googleapis.com/pai-images/02a3a7cb7d2247edb50be7ce7031d699.jpeg" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Food Costa</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="https://github.com/Redclawww" className="mr-4 hover:underline md:mr-6 ">Github</Link>
                </li>
                <li>
                    <Link to="https://www.linkedin.com/in/raghav-sharma-80b4621a9" className="mr-4 hover:underline md:mr-6">LinkedIn</Link>
                </li>
                <li>
                    <Link to="" className="mr-4 hover:underline md:mr-6 ">Source Code</Link>
                </li>
                <li>
                    <Link to="https://www.redclaww02@gmail.com" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-1a1boZVspan" />
    </div>
</footer>
    </div>
  )
}
