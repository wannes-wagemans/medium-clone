import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white p-5">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              className="w-12 cursor-pointer object-contain"
              src="/Logo.svg"
              alt="Wannes logo"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-10 text-lg">
          <div className="hidden items-center space-x-5 sm:inline-flex">
            <h3 className="cursor-pointer hover:underline">
              <a href="https://github.com/wannes-wagemans" target="_blank">
                Follow
              </a>
            </h3>
          </div>
          <h3 className="cursor-pointer hover:underline">
            <a
              href="https://www.linkedin.com/in/wannes-wagemans/"
              target="_blank"
            >
              Contact me
            </a>
          </h3>
        </div>
      </div>
    </header>
  )
}

export default Header
