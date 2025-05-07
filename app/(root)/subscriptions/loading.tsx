'use client'
import Spinner from '@/app/components/Spinner'
import React from 'react'

const loading = () => {
    return (
        <Spinner color='#222eff' wrapperClass='h-screen w-full' />
    )
}

export default loading