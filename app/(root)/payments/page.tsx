'use client'
import RenewCard from '@/app/components/RenewCard'
import Spinner from '@/app/components/Spinner'
import { getDashboardStats } from '@/lib/dashboardStats'
import { getAllPayments } from '@/lib/fetchPayments'
import { RootState } from '@/store/store'
import { paymentResponseType, subscriptionResponseType } from '@/types/subsciption'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import PaymentList from './PaymentList'
import { resetCategory, resetFrequency, resetSearchKeyword } from '@/store/subscriptionSlice'


const page = () => {
  const [upcomingRenewalsubs, setUpcomingRenewalsubs] = useState<subscriptionResponseType[]>([]);
  const subscriptionList = useSelector((state: RootState) => state.subscription.subscriptionList)
  const [allPayments, setAllPayments] = useState<paymentResponseType>([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetCategory())
    dispatch(resetFrequency())
    dispatch(resetSearchKeyword())
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true)
        const { upcomingRenewals } = getDashboardStats(subscriptionList)
        console.log('upcomingRenewals', upcomingRenewals);
        setUpcomingRenewalsubs(upcomingRenewals)
        const payments = await getAllPayments()
        console.log('payments', payments);
        if (!payments.success) {
          toast.error(payments.message || 'Something went wrong')
        }
        else setAllPayments(payments.data)
      } catch (error: any) {
        toast.error(error.message || 'Error fetching payments')
      }
      finally{
        setLoading(false)
      }
    }
    fetchPaymentHistory()
  }, [])
  return (
    <div>
      {loading && <Spinner color='#222eff' wrapperClass='h-screen w-full' />}
      {upcomingRenewalsubs.length > 0 && <><p className='font-semibold text-xl my-3'>Upcoming renewal plans</p>
        <div className="w-full flex gap-3">
          {upcomingRenewalsubs.map((item, i) => (
            <RenewCard key={i} classes='p-4 w-1/3' title={item.name} price={item.price} daysLeft={item.daysLeft || 0} logo={item.subLogo} />
          ))}
        </div></>}
      {allPayments.length !== 0 && <PaymentList payments={allPayments}/>}

    </div>
  )
}

export default page