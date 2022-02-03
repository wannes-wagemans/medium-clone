import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <header
      className={`${
        pathname === '/' && 'sticky top-0 border-black'
      } z-50 mx-auto flex max-w-7xl justify-between border-b bg-white p-5`}
    >
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="/Logo.svg"
            alt="Wannes logo"
          />
        </Link>
        <div className="hidden items-center space-x-5 sm:inline-flex">
          <h3 className="cursor-pointer rounded-full border-2 border-green-600 bg-white px-4 py-1 text-green-600 hover:bg-green-600 hover:text-white">
            <a href="https://github.com/wannes-wagemans" target="_blank">
              Follow
            </a>
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600">
        <h3 className="cursor-pointer rounded-full border-2 border-green-600 bg-green-600 px-4 py-1 text-white hover:bg-white hover:text-green-600">
          <a
            href="https://www.linkedin.com/in/wannes-wagemans/"
            target="_blank"
          >
            Contact me
          </a>
        </h3>
      </div>
    </header>
  )
}

export default Header
