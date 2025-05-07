"use client"
import AppCard from '@/app/components/AppCard';
import { getUserSubscriptions } from '@/lib/fetchSubscription';
import React, { useEffect, useState } from 'react'

import RenewCard from '@/app/components/RenewCard';
import Chart from '@/graphs/Chart';
import { categoryComparison, section1Content, section2Content, spendingData } from '@/lib/dummyData';
import SpendingChart from './SpendingChart';
import { json } from 'stream/consumers';
import Spinner from '@/app/components/Spinner';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSubscriptionList } from '@/store/subscriptionSlice';
import { GraphDataType, subscriptionResponseType } from '@/types/subsciption';
import { getDashboardStats } from '@/lib/dashboardStats';

const page = () => {
  const [dashboardSummary, setDashboardSummary] = useState<typeof section1Content>([])
  const [upcomingRenewals, setUpcomingRenewals] = useState<subscriptionResponseType[]>([]);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState<GraphDataType>({ series: [], xAxis: { categories: [] } });
  const [spendingBreakdown, setSpendingBreakdown] = useState<typeof spendingData>({ lastMonth: [], currentMonth: [], last6Months: [], lastYear: [] });
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user === null) {
      // toast.error("No user found")
      return;
    }
    console.log(user._id);

    const fetchSubscriptions = async () => {
      try {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user') || '')
        console.log(user._id);
        const allSubscriptions = await getUserSubscriptions(user._id || '')
        console.log(allSubscriptions);
        if (!allSubscriptions.success) {
          toast.error(allSubscriptions.message || 'Something went wrong')
          console.log(allSubscriptions.message);
          
        }
        else dispatch(setSubscriptionList(allSubscriptions.data));
        const {
          dashboardsummary,
          upcomingRenewals,
          categoryComparison,
          spendingAnalysis,
          percentChange
        } = getDashboardStats(allSubscriptions.data)
        console.log('upcomingRenewals', upcomingRenewals);
        console.log('monthlySpending', dashboardsummary);
        setDashboardSummary(dashboardsummary)
        setUpcomingRenewals(upcomingRenewals)
        setCategoryBreakdown(categoryComparison)
        setSpendingBreakdown(spendingAnalysis)
        setPercentage(percentChange)
      } catch (error: any) {
        toast.error(error.message || 'Error fetching subscriptions')
        console.log(error.message);
      }
      finally {
        setLoading(false)
      }
    };
    fetchSubscriptions();
  }, []);


  return (
    <>
      {loading ? <Spinner color='#222eff' wrapperClass='h-screen w-full' /> :
        <>
          <p className='font-semibold text-xl mb-2'>Subscription Summary</p>
          <div className="section1 w-full flex gap-3 flex-wrap max-sm:flex-col">
            {dashboardSummary.map((item, i) => (
              <AppCard key={i} classes='p-4 w-1/3 max-sm:w-[100%] max-md:w-[48%] lg:w-[32.5%]' title={item.name} content={item.value} type={item.type} Logo={item.logo} percentageChange={percentage} />
            ))}
          </div>
          {upcomingRenewals.length > 0 && <><p className='font-semibold text-xl my-3'>Upcoming renewal plans</p>
            <div className="section2 w-full flex gap-3 flex-wrap max-sm:flex-col">
              {upcomingRenewals.map((item, i) => (
                <RenewCard key={i} classes='p-4 w-1/3 max-sm:w-[100%] max-md:w-[48%] lg:w-[32.5%]' title={item.name} price={item.price} daysLeft={item.daysLeft || 0} logo={item.subLogo} />
              ))}
            </div></>}
          <p className='font-semibold text-xl my-3'>Statistics</p>
          <div className="section3 w-full flex gap-3 max-md:flex-col">
            <div className="lg:w-1/2">  <Chart data={categoryBreakdown} heading='Category Breakdown' chartType='pie' height={400} /></div>
            <SpendingChart spendingAnalysis={spendingBreakdown} loading={loading} />
          </div>
        </>
      }
    </>
  )
}

export default page
