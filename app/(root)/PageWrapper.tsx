'use client'
import Navbar from '@/components/Navbar'
import { useSidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import { useIsMobile } from '@/hooks/use-mobile'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    const {open} = useSidebar()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const isMobile = useIsMobile()
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
            // else router.replace('/dashboard')
        }
        else{
            toast.error('Session expired heading towards Sign in')
            const promise = new Promise((resolve) => setTimeout(() => resolve(''), 4000))
            router.replace('/sign-in')
        }
        setLoading(false)
    }, [router])

    if (loading) return <Spinner color='#222eff' wrapperClass='h-screen w-full' message='Checking login status...'/>
    return (
        <div className={cn("right transition-all duration-300", isMobile ? 'w-full' : (open ? 'w-[88%]' : 'w-[98%]'))}>
            <Navbar />
            <main className="overflow-y-auto h-[90vh] p-4">
                {/* <SidebarTrigger className="absolute top-5 left-44 z-10"/> */}
                {children}
            </main>
        </div>
    )
}

export default PageWrapper
