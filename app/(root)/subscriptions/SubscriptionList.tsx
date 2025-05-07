'use client'
import NotFound from '@/app/components/NotFound'
import { getUserSubscriptions } from '@/lib/fetchSubscription'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import notFoundSubscription from '@/public/surprise-box.png'
import { subscriptionResponseType, subscriptionType } from '@/types/subsciption'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { resetCategory, resetFrequency, resetSearchKeyword, setSubscriptionList } from '@/store/subscriptionSlice'
import { Hourglass } from 'react-loader-spinner'
import SandWatch from '@/app/components/SandWatch'
import Spinner from '@/app/components/Spinner'
import { table } from 'console'
import SubscriptionSheet from './SubscriptionSheet'
import { ChevronRightCircle } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const SubscriptionList = () => {
    // const [subscriptionList, setSubscriptionList] = useState<subscriptionResponseType[]>([])
    const subscriptionList = useSelector((state: RootState) => state.subscription.subscriptionList)
    const viewMode = useSelector((state: RootState) => state.subscription.viewMode)
    const category = useSelector((state: RootState) => state.subscription.category)
    const frequency = useSelector((state: RootState) => state.subscription.frequency)
    const isActive = useSelector((state: RootState) => state.subscription.isActive)
    const searchKeyword = useSelector((state: RootState) => state.subscription.searchKeyword)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectedSub, setSelectedSub] = useState<subscriptionResponseType | null>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetCategory())
        dispatch(resetFrequency())
        dispatch(resetSearchKeyword())
        const getUserSubscriptionList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '')
                console.log(user._id);
                const allSubscriptions = await getUserSubscriptions(user._id)
                console.log(allSubscriptions);
                if (!allSubscriptions.success) {
                    toast.error(allSubscriptions.message || 'Something went wrong')
                }
                else dispatch(setSubscriptionList(allSubscriptions.data));
            } catch (error: any) {
                toast.error(error.message || 'Error fetching subscriptions')
            }
            finally {
                setLoading(false)
            }
        }
        getUserSubscriptionList();
    }, [])

    // useEffect(() => {
    //     console.log(category);
    //     console.log(frequency);
    // },[category, frequency])
    const isMobile = useIsMobile()
    return (
        <>
            {loading ? <Spinner color='#222eff' wrapperClass='h-[80%]' /> :
                (subscriptionList.filter(sub => (sub.category.includes(category)) && (sub.frequency.includes(frequency)) && (sub.status === isActive)).length !== 0 ?
                    (viewMode === 'card' ? <div className='grid grid-cols-3 gap-4 mt-4 max-md:grid-cols-2 max-sm:grid-cols-1'>
                        {subscriptionList
                            .filter(sub => (sub.category.includes(category)) && (sub.frequency.includes(frequency)) && (sub.status === isActive) && sub.name.toLowerCase().includes(searchKeyword.toLowerCase()))
                            .map((item, i) => (
                                <div key={i} className='flex bg-white shadow-md p-2 rounded-md gap-3 max-lg:flex-col'>
                                    <div className="flex gap-3 w-full">
                                       <Image src={item.subLogo} alt={item.name} width={30} height={30} className='object-contain' />
                                    <div className="info w-full flex flex-col justify-around items-start gap-1 max-lg:w-full">
                                        <button
                                            onClick={() => {
                                                setSelectedSub(item)  // sub is the current subscription item
                                                setOpen(true)
                                            }} className='text-md cursor-pointer'>{item.name}</button>
                                        <div className='text-xs'>{item.category}</div>
                                    </div> 
                                    </div>
                                    
                                    <div className="subInfo flex flex-col justify-around items-start gap-1 max-lg:flex-row max-lg:justify-center max-lg:items-center">
                                        <div className='text-md'>&#8377;{item.price}/</div>
                                        <div className='text-xs'>{item.frequency.split('ly')[0]}</div>
                                    </div>
                                </div>
                            ))}
                    </div> :
                        <div className='bg-white rounded-md shadow-md mt-4 p-4 max-h-[78%] overflow-y-auto'>
                            <table className='table w-full max-md:text-xs text-nowrap'>
                                <thead>
                                    <tr className=' border-b'>
                                        <th className='p-3 text-start'>Item</th>
                                        <th className='p-3 text-start'>Price</th>
                                        <th className='p-3 text-start'>Billing Period</th>
                                        <th className='p-3 text-start'>Payment Date</th>
                                        <th className='p-3 text-start'>End Date</th>
                                        <th className='p-3 text-start'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptionList
                                        .filter(sub => (sub.category.includes(category)) && (sub.frequency.includes(frequency)) && (sub.status === isActive) && sub.name.toLowerCase().includes(searchKeyword.toLowerCase()))
                                        .map((item, i) => {
                                            const startDate = new Date(item.startDate).toDateString()
                                            const renewalDate = new Date(item.renewalDate).toDateString()
                                            // console.log('startDate', startDate);
                                            return <tr className='text-sm border-b' key={i}>
                                                <td className='px-3 py-4 text-start flex gap-2 items-center'><Image src={item.subLogo} alt={item.name} width={20} height={20} className='object-contain' />{item.name}</td>
                                                <td className='px-3 py-4 text-start'>&#8377;{item.price}</td>
                                                <td className='px-3 py-4 text-start'>{item.frequency}</td>
                                                <td className='px-3 py-4 text-start'>{startDate}</td>
                                                <td className='px-3 py-4 text-start'>{renewalDate}</td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSub(item)  // sub is the current subscription item
                                                            setOpen(true)
                                                        }}><ChevronRightCircle className='cursor-pointer' color='#222eff' size={isMobile ? 15 : 20}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>
                        </div>) :
                    <NotFound message='subscription found' classes='h-[90%]'>
                        <Image alt='notFoundSubscription' src={notFoundSubscription} width={100} />
                    </NotFound>
                )}
            {selectedSub && (
                <SubscriptionSheet
                    subscriptionInfo={selectedSub}
                    open={open}
                    setOpen={setOpen}
                />
            )}
        </>
    )
}

export default SubscriptionList
