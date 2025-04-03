import React from 'react'
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import { cn } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image';
import { ChevronRight } from 'lucide-react';

const RenewCard = ({classes, title, price, daysLeft, logo}: {classes: string, title: string, price: number, daysLeft: number, logo: StaticImageData}) => {
    return (
        <Card className={cn('shadow-md', classes)}>
            <CardHeader className='p-0 flex justify-between'>
                <div>
                    <Image src={logo.src} width={30} height={30} alt={title}/>{title}
                </div>
                <button className='rounded-full cursor-pointer bg-sky-100'><ChevronRight /></button>
            </CardHeader>
            <CardContent className='p-0 w-full flex gap-2'>
                <button className='border border-[#222eff] rounded text-[#222eff] py-1 px-2'>In {daysLeft} days</button>
                <button className='bg-[#222eff] rounded text-white py-1 px-2 cursor-pointer'>Pay &#8377;{price}</button>
            </CardContent>
        </Card>
    )
}

export default RenewCard
