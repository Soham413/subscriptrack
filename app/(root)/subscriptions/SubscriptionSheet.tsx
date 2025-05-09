import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addPayment } from '@/lib/fetchPayments'
import { updateSubscription } from '@/lib/fetchSubscription'
import { subscriptionResponseType } from '@/types/subsciption'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

const SubscriptionSheet = ({ open, setOpen, subscriptionInfo }: { open: boolean, setOpen: any, subscriptionInfo: subscriptionResponseType }) => {
  const remainingDays = Math.ceil((new Date(subscriptionInfo.renewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const renew = async () => {
    const renewalDate = new Date(subscriptionInfo.renewalDate)
    const startDate = new Date(renewalDate)
    startDate.setDate(startDate.getDate() + 1)
    const paidAt = new Date()
    const updateResponse = await updateSubscription(subscriptionInfo._id, { startDate })
    if (updateResponse.success) {
      const paymentInfo = {
        paidAt,
        userId: subscriptionInfo.user,
        renewalDate: updateResponse.data.renewalDate
      }
      const response = await addPayment(subscriptionInfo._id, paymentInfo)
      if (response.success) {
        toast.success('Subscription renewed successfully')
      }
      else {
        toast.error(response.message || 'Payment is unsuccessful')
      }

    }
    else toast.error(updateResponse.message || 'Subscription not renewed')
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px] h-[62vh] overflow-y-auto m-auto rounded-l-md p-4">
        <SheetHeader className='p-0'>
          <SheetTitle>Details</SheetTitle>
        </SheetHeader>
        <div className='bg-accent rounded-md p-2'>
          <div className="name bg-white p-2 rounded-md flex items-center gap-2"><Image src={subscriptionInfo.subLogo} alt={subscriptionInfo.name} width={40} height={40} />
            <div>
              <p className='text-black'>{subscriptionInfo.name}</p>
              <p className='text-xs'>{subscriptionInfo.category}</p>
            </div>
          </div>
          {subscriptionInfo ? (
            <div className="mt-6 space-y-2 text-sm">
              <span className='mb-2 text-sm text-black'>Plan Details</span>
              <div className='bg-white rounded-md shadow-md mt-2 p-4'>
                <table className='table w-full'>
                  <tbody className='text-left'>
                    <tr>
                      <th className='p-1'>Status</th>
                      <td className='text-black'>{subscriptionInfo.status}</td>
                    </tr>
                    <tr>
                      <th className='p-1'>Price</th>
                      <td className='text-black'>₹{subscriptionInfo.price}</td>
                    </tr>
                    <tr>
                      <th className='p-1'>Started on</th>
                      <td className='text-black'>{new Date(subscriptionInfo.startDate).toDateString()}</td>
                    </tr>
                    <tr>
                      <th className='p-1'>Ending on</th>
                      <td className='text-black'>{new Date(subscriptionInfo.renewalDate).toDateString()}</td>
                    </tr>
                    <tr>
                      <th className='p-1'>Days remaining</th>
                      <td className='text-black'>{remainingDays} days</td>
                    </tr>
                  </tbody>
                </table>
                <div className='flex gap-2'>
                  <button className='bg-[#222eff] p-2 rounded-md text-white w-full mt-4 cursor-pointer' onClick={renew}>Renew for ₹{subscriptionInfo.price}</button>
                  {subscriptionInfo.status !== 'cancelled' &&
                    <button className='bg-[#222eff] p-2 rounded-md text-white w-fit mt-4 cursor-pointer' title='Cancel subscription'><Trash2 /></button>
                  }
                </div>

              </div>
            </div>
          ) : (<div>No Subscription details found</div>)}
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default SubscriptionSheet
