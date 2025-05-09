'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Search } from 'lucide-react'
import { setSearchKeyword } from '@/store/subscriptionSlice'

const SubsHeader = () => {
  const subscriptionList = useSelector((state: RootState) => state.subscription.subscriptionList)
  const searchKeyWord = useSelector((state: RootState) => state.subscription.searchKeyword)
  const dispatch = useDispatch()
  return (
    <div className='flex gap-2 items-center max-md:flex-col max-md:items-start'>
      <p className='font-semibold text-xl'>Your subscriptions({subscriptionList.length})</p>
      <div className="searchContainer bg-white border shadow-md flex gap-1 items-center rounded-md p-2 w-64">
        <Search size={20} className='text-gray-400'/>
        <input
          type="text"
          placeholder='Search'
          className='w-full outline-none text-sm'
          value={searchKeyWord}
          onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
        />
      </div>
    </div>
  )
}

export default SubsHeader
