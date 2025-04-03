import React from 'react'
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import { cn } from '@/lib/utils'
import CountUp from 'react-countup';
import { StaticImageData } from 'next/image';
import { IconType } from 'react-icons';

const AppCard = ({classes, title, content, type, Logo}: {classes: string, title: string, content: any, type: string, Logo: IconType}) => {
    return (
        <Card className={cn('shadow-md', classes)}>
            <CardHeader className='p-0 flex gap-1 items-center'>
                 <Logo /> {title}
            </CardHeader>
            <CardContent className='p-0'>
                <p className='text-4xl font-bold text-[#222eff]'><CountUp prefix={type === 'price' ? '&#8377;' : ''} end={content} /></p>
            </CardContent>
        </Card>
    )
}

export default AppCard
