import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

interface CardProps {
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      url: string
    }
  }
  title: string
  description: string
}

export const Card: React.FC<CardProps> = ({
  slug,
  mainImage,
  title,
  description,
}) => {
  return (
    <Link href={`/post/${slug.current}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border">
        <img
          className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
          src={urlFor(mainImage).url()!}
        />
        <div className="flex items-center justify-between bg-white p-5">
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-xs">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
