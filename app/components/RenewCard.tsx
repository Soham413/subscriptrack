import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { subscriptionResponseType } from '@/types/subsciption';
import SubscriptionSheet from '../(root)/subscriptions/SubscriptionSheet';

type renewCardProps = {
    subscription: subscriptionResponseType,
    classes: string
}

const RenewCard = ({ classes, subscription }: renewCardProps) => {
    const [selectedSub, setSelectedSub] = useState<subscriptionResponseType | null>(null)
    const [open, setOpen] = useState(false)
    return (
        <>
            <Card className={cn('shadow-md', classes)}>
                <CardHeader className='p-0 flex justify-between'>
                    <div>
                        <Image src={subscription.subLogo} width={30} height={30} alt={subscription.name} />{subscription.name}
                    </div>
                    <button className='rounded-full cursor-pointer bg-sky-100' onClick={() => {
                        setSelectedSub(subscription)
                        setOpen(true)
                    }}><ChevronRight /></button>
                </CardHeader>
                <CardContent className='p-0 w-full flex gap-2'>
                    <button className='border border-[#222eff] rounded text-[#222eff] py-1 px-2'>In {subscription.daysLeft} days</button>
                    <button className='bg-[#222eff] rounded text-white py-1 px-2 cursor-pointer'>Pay &#8377;{subscription.price}</button>
                </CardContent>
            </Card>
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

export default RenewCard
