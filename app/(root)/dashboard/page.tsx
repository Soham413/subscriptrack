"use client"
import AppCard from '@/app/components/AppCard';
import { getUserSubscriptions } from '@/lib/fetch';
import React, { useEffect, useState } from 'react'

import RenewCard from '@/app/components/RenewCard';
import DoughnutChart from '@/graphs/DoughnutChart';
import { categoryComparison, section1Content, section2Content } from '@/lib/dummyData';
import SpendingChart from './SpendingChart';

const page = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const userId = "123456"; // Get from Redux/Auth

  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     try {
  //       const data = await getUserSubscriptions(userId);
  //       setSubscriptions(data.data);
  //     } catch (error) {
  //       console.error("Error fetching subscriptions", error);
  //     }
  //   };
  //   fetchSubscriptions();
  // }, []);


  return (
    <div className='p-4'>
      <p className='font-bold text-2xl mb-2'>Subscription Summary</p>
      <div className="section1 w-full flex gap-3">
        {section1Content.map((item, i) => (
          <AppCard key={i} classes='p-4 w-1/3' title={item.name} content={item.value} type={item.type} Logo={item.logo}/>
        ))}
      </div>
      <p className='font-bold text-2xl my-3'>Upcoming renewal plans</p>
      <div className="section2 w-full flex gap-3">
        {section2Content.map((item, i) => (
          <RenewCard key={i} classes='p-4 w-1/3' title={item.name} price={item.price} daysLeft={item.daysLeft} logo={item.logo} />
        ))}
      </div>
      <p className='font-bold text-2xl my-3'>Statistics</p>
      <div className="section3 w-full flex gap-3">
        <DoughnutChart data={categoryComparison} heading='Category Breakdown' chartType='pie'/>
        <SpendingChart />
      </div>

    </div>
  )
}

export default page
