import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = ({ message, classes, children, giveBackBtn }: { message: string, classes: string, children?: React.ReactNode, giveBackBtn?: boolean }) => {
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
  return (
    <div className={cn('flex justify-center items-center flex-col gap-2', classes)}>
      {/* <div> */}
        No {message} found !!!
        {giveBackBtn && <button className='p-2 bg-primary text-white rounded-md' onClick={goBack}>Go Back</button>}
        {children}
      {/* </div> */}
    </div>
  )
}

export default NotFound;