import React from 'react'

interface CommentProps {
  name: string
  comment: string
  _createdAt: string
}

export const Comment: React.FC<CommentProps> = ({
  name,
  comment,
  _createdAt,
}) => {
  return (
    <div className="my-4 rounded border border-gray-200 p-4 shadow">
      <div className="flex items-center space-x-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500">
          <p className="text-4xl text-white">{name.substring(0, 1)}</p>
        </span>
        <div>
          <p className="text-xl text-gray-600">{name} </p>
          <p className="text-sm text-gray-400">
            {new Date(_createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-4">{comment}</p>
    </div>
  )
}
