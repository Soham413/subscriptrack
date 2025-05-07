'use client'
import React, { useState } from 'react'
import authBg from '@/public/sign_up_image.jpg'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, signUp } from '@/lib/fetchUser'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Spinner from '../components/Spinner'
import { useIsMobile } from '@/hooks/use-mobile'

const AuthForm = ({ type }: { type: string }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const onSubmit = async (data: any) => {
        setLoading(true)
        if (type === 'Sign Up') {
            const response = await signUp(data);
            console.log('sign up response', response);
            if (response?.success) {
                toast.success(response.message || 'Signed up successfully')

                // Store token + user info if needed
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))

                // Redirect to dashboard
                router.push('/dashboard')
            } else {
                toast.error(response.message || 'Something went wrong')
            }
        }
        else {
            const response = await signIn(data);
            console.log('sign in response', response);
            if (response?.success) {
                console.log('in toast');

                toast.success(response.message || 'Signed in successfully')

                // Store token + user info if needed
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))

                // Redirect to dashboard
                router.push('/dashboard')
            } else {
                toast.error(response.message || 'Something went wrong')
            }
        }
    };
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const isMobile= useIsMobile()
    return (
        <div className='flex w-screen h-screen bg-[#d8e2ff]'>
            <div className={cn("form w-[50%] flex items-center justify-center border-2 rounded-md", isMobile && 'w-full border-0')}>
                <div className="body rounded-lg shadow-lg bg-accent py-4 pl-6 pr-2">
                    <div className="header py-4 text-center text-2xl font-semibold"><i>SubsTrack</i></div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        {type === 'Sign Up' && <>
                            <input
                                placeholder='Enter full name'
                                className='authInput'
                                {...register("name", { required: { value: true, message: 'Name is required' }, minLength: 3, maxLength: 50 })} />
                            {errors.name && <p className='authErrorMessage'>{errors.name?.message as string}</p>}
                        </>}
                        <input
                            placeholder='Enter email id'
                            className='authInput'
                            type="text"
                            {...register("email", { required: { value: true, message: 'Email is required' }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid Email' } })} />
                        {errors.email && <p className='authErrorMessage'>{errors.email?.message as string}</p>}
                        <div className='flex items-center'>
                            <input
                                placeholder='Enter password'
                                className='authInput'
                                type={showPassword ? "text" : "password"}
                                {...register("password",
                                    {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/, message: 'Min one uppercase, one special character required' },
                                        min: { value: 8, message: 'Min 8 characters required' }, max: 99
                                    })} /> &nbsp; <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size='18px' /> : <Eye size='18px' />}</button> </div>
                        {errors.password && <p className='authErrorMessage'>{errors.password?.message as string}</p>}
                        <button
                            type="submit"
                            className={cn('p-2 rounded-sm w-76 border-2 bg-[#222eff] text-white font-semibold cursor-pointer', loading && 'bg-[#222eff]/50 cursor-not-allowed')}
                            disabled={loading}>
                            {!loading ? type : <Spinner color='white' wrapperClass=''/>}
                        </button>
                    </form>
                    <div className="footer">
                        {type === 'Sign Up'
                            ? <p className='text-sm py-2 text-center'>Already have an account? <Link href='/sign-in' className='text-[#222eff] font-semibold'>Sign In</Link></p>
                            : <p className='text-sm py-2 text-center'>Don't have an account? <Link href='/sign-up' className='text-[#222eff] font-semibold'>Sign Up</Link></p>}
                    </div>
                </div>
            </div>
            {!isMobile && <div className="border-l-2 background w-[50%] bg-white flex justify-end items-center">
                <Image src={authBg} alt='Auth Bg' width={600} height={800} className='border-y-2 border-l-2 border-black rounded-y-xl rounded-l-xl' />
            </div>}
        </div>
    )
}

export default AuthForm
