import { cn } from '@/lib/utils'
import React from 'react'

type AuthInputProps = {title: string, 
  id: string, 
  className: string, 
  placeholder: string, 
  type: string, 
  register: any;
  error?: string;
  validation?: object;
};

const CustomInput = ({title, id, className, placeholder, type, register, validation, error}: AuthInputProps) => {
  // console.log(error);
  
  return (
    <div className='flex flex-col gap-1 text-sm'>
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} className={cn('customInput', className)} placeholder={placeholder} {...register(id, validation)}/>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default CustomInput
