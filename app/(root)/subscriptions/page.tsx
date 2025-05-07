import { CalendarPlus } from 'lucide-react'
import React from 'react'
import CreateSubs from './CreateSubs'
import { TestDatePicker } from '@/app/components/TestDatepicker'
import SubscriptionList from './SubscriptionList'
import SubsHeader from './SubsHeader'
import SubsController from './SubsController'

const page = () => {
  return (
    <>
      <SubsController />
      <div className="flex justify-between items-center">
        <SubsHeader />
        <CreateSubs />
        {/* <TestDatePicker /> */}
      </div>
      <SubscriptionList />
    </>
  )
}

export default page
