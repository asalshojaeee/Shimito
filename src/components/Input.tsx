import React from 'react'

interface InputProps {
  id?: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ id, placeholder, type = 'text', value, onChange } : InputProps) {
  return (
    <input
      id={id}
      type={type}
      required
      placeholder={placeholder}
      dir='rtl'
      value={value}
      onChange={onChange}
      className='
      placeholder:text-gray-200
      w-full
      bg-transparent
      border-b
      border-gray-400
      focus:border-blue-500
      focus:outline-none
      py-2
      text-white
      placeholder-gray-400
      transition-colors
    '
    />
  )
}
