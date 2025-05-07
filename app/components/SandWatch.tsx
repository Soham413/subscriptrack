'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { Hourglass } from 'react-loader-spinner'
import { twMerge } from 'tailwind-merge'

type LoadingProps = {
    width?: number,
    height?: number,
    // primaryColor: string,
    // secondaryColor: string,
    wrapperClass?: string,
}
const SandWatch = ({width, height, wrapperClass}: LoadingProps) => {
  return (
    <Hourglass 
        width={width}
        height={height}
        colors={['#222eff', '#555dff']}
        wrapperClass={cn("inline w-full flex justify-center mx-auto", wrapperClass)}
    />
  )
}

export default SandWatch
