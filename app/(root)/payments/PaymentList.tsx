import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { subsCategory, subsFrequency } from '@/lib/dummyData'
import { RootState } from '@/store/store'
import { setCategory, setFrequency } from '@/store/subscriptionSlice'
import { paymentResponseType } from '@/types/subsciption'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PaymentList = ({ payments }: { payments: paymentResponseType }) => {
    const dispatch = useDispatch();
    const category = useSelector((state: RootState) => state.subscription.category)
    const frequency = useSelector((state: RootState) => state.subscription.frequency)
    const [searchKeyWord, setSearchKeyword] = useState('')
    return (
        <>
            <div className='header flex justify-between items-center gap-2 mb-4 w-full max-sm:items-end max-sm:flex-col max-sm:gap-6 max-sm:mb-2'>
                <div className='flex gap-2 items-center w-full max-sm:flex-col'>
                    <p className='font-semibold text-xl md:text-nowrap'>Payments Record</p>
                    <div className='flex justify-between w-full'>
                        <Select onValueChange={(value) => dispatch(setCategory(value))}>
                            <SelectTrigger className='w-48 border border-[#222eff] bg-white'>
                                <SelectValue placeholder='Category' />
                            </SelectTrigger>
                            <SelectContent>
                                {subsCategory.map((item: { name: string, value: string }, i) => (
                                    <SelectItem value={item.value} key={i} className='hover:bg-accent rounded cursor-pointer'>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => dispatch(setFrequency(value))}>
                            <SelectTrigger className='w-48 border border-[#222eff] bg-white'>
                                <SelectValue placeholder='Frequency' />
                            </SelectTrigger>
                            <SelectContent>
                                {subsFrequency.map((item: { name: string, value: string }, i) => (
                                    <SelectItem value={item.value} key={i} className='hover:bg-accent rounded cursor-pointer'>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="searchContainer bg-white border shadow-md flex gap-1 items-center rounded-md p-2 w-64">
                    <Search size={20} className='text-gray-400' />
                    <input
                        type="text"
                        placeholder='Search'
                        className='w-full outline-none text-sm'
                        value={searchKeyWord}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            <div className='bg-white rounded-md shadow-md p-4 max-h-[78%] overflow-y-auto'>
                <table className='table w-full max-md:text-xs text-nowrap'>
                    <thead>
                        <tr className='border-b'>
                            <th className='p-3 text-start'>Name</th>
                            <th className='p-3 text-start'>Cost</th>
                            <th className='p-3 text-start'>Paid At</th>
                            <th className='p-3 text-start'>Category</th>
                            <th className='p-3 text-start'>Billing Period</th>
                            <th className='p-3 text-start'>Next Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments
                            .filter((payment) => payment.category.includes(category) && payment.frequency.includes(frequency) && payment.name.toLowerCase().includes(searchKeyWord.toLowerCase()))
                            .map((payment, k) => {
                                const paidAt = new Date(payment.paidAt).toDateString()
                                const renewalDate = new Date(payment.renewalDate).toDateString()
                                return <tr className='border-b' key={k}>
                                    <td className='p-3 text-start text-sm flex gap-2 items-center'><Image src={payment.subLogo} alt={payment.name} width={20} height={20} />{payment.name}</td>
                                    <td className='p-3 text-start text-sm'>&#8377;{payment.price}</td>
                                    <td className='p-3 text-start text-sm'>{paidAt}</td>
                                    <td className='p-3 text-start text-sm'>{payment.category.split('')[0].toUpperCase() + payment.category.slice(1, payment.category.length)}</td>
                                    <td className='p-3 text-start text-sm'>{payment.frequency}</td>
                                    <td className='p-3 text-start text-sm'>{renewalDate}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PaymentList
