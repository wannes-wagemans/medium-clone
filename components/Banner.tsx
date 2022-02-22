import React from 'react'

export const Banner: React.FC = () => {
  return (
    <div className="border-b border-black bg-yellow-500 px-5 ">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-10 lg:py-0">
        <div className="space-y-5">
          <div className="max-w-xl font-sans text-3xl sm:text-5xl">
            <h1 className="mb-0">
              Welcome to{' '}
              <span className="font-bold tracking-tighter">WAWA React</span>.
            </h1>
            <h1 className="mt-0">
              A place to learn and read more about React.
            </h1>
          </div>
          <h2>
            Personal blog by{' '}
            <a
              className="underline"
              href="https://github.com/wannes-wagemans"
              target="_blank"
            >
              Wannes Wagemans
            </a>
            .
          </h2>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:h-72 lg:py-12"
          src="/BannerImage.svg"
          alt="Wannes logo short"
        />
      </div>
    </div>
  )
}
