import CustomInput from '@/app/components/CustomInput'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { userType } from './page'
import { updateUser } from '@/lib/fetchUser'
import toast from 'react-hot-toast'
import Spinner from '@/app/components/Spinner'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/userSlice'


const ProfileForm = ({ user, setEditInfo, onClose }: { user: userType, setEditInfo: React.Dispatch<React.SetStateAction<boolean>>, onClose: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            newPassword: "",
            confirmPassword: "",
        },
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = async (data: any) => {
        setLoading(true)
        console.log("Updated profile", data)
        const body = {'name': data.name, 'email': data.email}
        const user = localStorage.getItem('user')
        const userId = user && JSON.parse(user)._id
        const response = await updateUser(userId, body)
        console.log(response);
        if(response.success) {
            toast.success('User updated successfully')
            dispatch(setUserInfo(response.data))
            onClose()
        }
        else toast.error(response.message || 'User has not been updated')
        setLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <CustomInput
                title="Name"
                id="name"
                className="w-60 mb-2 max-sm:w-[90%]"
                placeholder="Enter new name"
                type="text"
                register={register}
                validation={{
                    required: { value: true, message: "Name is required" },
                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                }}
                error={errors.name?.message as string}
            />

            <CustomInput
                title="Email"
                id="email"
                className="w-60 mb-2 max-sm:w-[90%]"
                placeholder="Enter new email"
                type="email"
                register={register}
                validation={{
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid Email' }
                }}
                error={errors.email?.message as string}
            />
            {/* <CustomInput
                title='New Password'
                id='newPassword'
                className='w-64 mb-2'
                placeholder='Enter new password'
                type="password"
                register={register}
                validation={{
                    required: { value: true, message: 'Password is required' },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/, message: 'Min one uppercase, one special character required' },
                    min: { value: 8, message: 'Min 8 characters required' },
                    max: 99
                }}
            />
            <CustomInput
                title="Confirm Password"
                id="confirmPassword"
                className='w-64 mb-2'
                placeholder="Re-enter new password"
                type="password"
                register={register}
                validation={{
                    required: "Confirm password is required",
                    validate: (value: any) =>
                        value === watch("newPassword") || "Passwords do not match",
                }}
                error={errors.confirmPassword?.message}
            /> */}
            <div className="controls mt-6 max-sm:w-full">
                <button className='px-4 py-2 border border-[#222eff] text-white bg-[#222eff] rounded-md cursor-pointer max-sm:text-sm' type="submit" disabled={loading}>{loading ? <Spinner color='#fff' width={20} height={20}/> : 'Update'}</button>
                <button className='px-4 py-2 border border-[#222eff] text-[#222eff] rounded-md ml-4 cursor-pointer max-sm:text-sm' onClick={() => setEditInfo(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default ProfileForm
