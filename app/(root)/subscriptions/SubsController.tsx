'use client'
import SelectDropdown from '@/app/components/SelectDropdown'
import { subsCategory, subsFrequency } from '@/lib/dummyData'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from 'react'
import { LayoutGrid, TableProperties } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setCategory, setFrequency, setIsActive, setViewMode } from '@/store/subscriptionSlice'
import { Switch } from '@/components/ui/switch'
import { useIsMobile } from '@/hooks/use-mobile'

const SubsController = () => {
    const viewMode = useSelector((state: RootState) => state.subscription.viewMode);
    const isActive = useSelector((state: RootState) => state.subscription.isActive);
    const dispatch = useDispatch();
    const isMobile = useIsMobile()
    return (
        <div className='bg-white shadow-md p-2 rounded-md w-full mb-4 flex justify-between items-center max-md:flex-wrap max-md:gap-2 max-sm:flex-col'>
            <div className=' flex items-center gap-3 max-sm:flex-col max-md:justify-between'>
                Filters:
                <Select onValueChange={(value) => dispatch(setCategory(value))}>
                    <SelectTrigger className='w-48 border border-[#222eff]'>
                        <SelectValue placeholder='Category' />
                    </SelectTrigger>
                    <SelectContent>
                        {subsCategory.map((item: { name: string, value: string }, i) => (
                            <SelectItem value={item.value} key={i} className='hover:bg-accent rounded cursor-pointer'>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => dispatch(setFrequency(value))}>
                    <SelectTrigger className='w-48 border border-[#222eff]'>
                        <SelectValue placeholder='Frequency' />
                    </SelectTrigger>
                    <SelectContent>
                        {subsFrequency.map((item: { name: string, value: string }, i) => (
                            <SelectItem value={item.value} key={i} className='hover:bg-accent rounded cursor-pointer'>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className='flex items-center gap-2 max-sm:justify-between max-sm:w-full'>
                    <label htmlFor="active">Active</label>
                    <Switch id="active" className='data-[state=checked]:bg-[#222eff] cursor-pointer' checked={isActive === 'active'} onCheckedChange={(val) => dispatch(setIsActive(val ? 'active' : 'expired'))} />
                </div>

            </div>
            <div className='flex items-center gap-3'>
                {!isMobile && 'View:'}
                <button
                    onClick={() => dispatch(setViewMode('card'))}
                    className={`p-2 cursor-pointer border rounded-md ${viewMode === 'card' ? 'text-[#222eff] bg-[#222eff]/20 border-[#222eff] border-2' : ''}`}
                >
                    <LayoutGrid size={20} fill='#222eff' color='#222eff' />
                </button>
                <button
                    onClick={() => dispatch(setViewMode('table'))}
                    className={`p-2 cursor-pointer border rounded-md ${viewMode === 'table' ? 'text-[#222eff] bg-[#222eff]/20 border-[#222eff] border-2' : ''}`}
                >
                    <TableProperties size={20} color='#222eff' />
                </button>
            </div>
        </div>

    )
}

export default SubsController
