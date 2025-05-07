'use client'
import { getUserDetails } from '@/lib/fetchUser'
import { Pencil, UserCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import humanInShirt from '@/public/human-in-shirt-2.png'
import ProfileForm from './ProfileForm'
import { strict } from 'assert'

export type userType = {
  name?: string;
  email?: string;
  _id?: string;
  __v?: number;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
const page = () => {
  const [editMode, setEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState<userType>({})
  
  return (
    <div className='rounded-md p-4 bg-white'>
      <div className="heading text-xl font-semibold mb-2">
        Profile Info
      </div>
      <div className="profileBody flex p-8">
        <div className="left w-1/2">
          {/* <UserCircle /> */}
          <Image src={humanInShirt} alt='Human in shirt' width={400} height={500} />
        </div>
        {Object.keys(userInfo).length !== 0 && <div className="right w-1/2">
          {/* {!editMode ? <>
            <label className="mb-1">Name</label>
            <p className='text-stone-500 mb-3'>{userInfo.name}</p>
            <label className="mb-1">Email</label>
            <p className='text-stone-500 mb-3'>{userInfo.email}</p>
            <button
              className='px-4 py-2 flex items-center gap-2 border border-[#222eff] text-[#222eff] rounded-md mt-6 cursor-pointer hover:bg-[#222eff] hover:text-white transition ease-in-out duration-300'
              onClick={() => setEditMode(true)}
            ><Pencil size={15} />edit profile</button>
          </> : 
          <>
            <ProfileForm user={userInfo} setEditInfo={setEditMode} onClose={onClose}/>
          </>} */}
        </div>}
      </div>
    </div>
  )
}

export default page
