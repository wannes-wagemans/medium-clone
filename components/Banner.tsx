import React from 'react'

export const Banner: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-black bg-yellow-400 py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Wannes
          </span>{' '}
          is a place to write, read and connect
        </h1>
        <h2>Welcome to my personal blog where I share my coding adventures.</h2>
      </div>
      <img
        className="mr-5 hidden h-32 md:inline-flex lg:h-full lg:py-10"
        src="/W.svg"
        alt="Wannes logo short"
      />
    </div>
  )
}
