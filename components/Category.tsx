import fontColorContrast from 'font-color-contrast'
import React from 'react'

interface CategoryProps {
  name: string
  color: string
}

export const Category: React.FC<CategoryProps> = ({ color, name }) => {
  return (
    <div
      className="rounded px-2 py-1 text-xs font-semibold"
      style={{
        backgroundColor: color,
        color: fontColorContrast(color),
      }}
    >
      {name}
    </div>
  )
}
