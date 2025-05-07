import { cn } from '@/lib/utils'
import React from 'react'
import { Oval } from 'react-loader-spinner'

const Spinner = ({ color, wrapperClass, message, width, height }: { color: string, wrapperClass?: string, message?: string, width?: number, height?: number}) => {
    return (
        <div className={cn("flex justify-center items-center flex-col", wrapperClass)}>
            <Oval width={width || 25} height={height || 25} color={color} strokeWidth={5} />
            {message}
        </div>
    )
}

export default Spinner
