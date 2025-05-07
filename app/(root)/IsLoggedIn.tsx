'use client'
import { jwtDecode } from 'jwt-decode';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { resolve } from 'path';

export const IsLoggedIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('token from dashboard', token);

        if (token !== null) {
            const { exp } = jwtDecode(token) as { exp: number };
            const isExpired = Date.now() >= exp * 1000;

            if (isExpired) {
                // Logout and redirect to login
                router.replace('/sign-in')
            }
            else router.replace('/dashboard')
        }
        else{
            toast.error('Session expired heading towards Sign in')
            const promise = new Promise((resolve) => setTimeout(() => resolve(''), 4000))
            router.replace('/sign-in')
        }
        setLoading(false)
    }, [router])

    if (loading) return <Spinner color='#222eff' wrapperClass='h-screen' message='Checking login status...'/>

    return null;
}


