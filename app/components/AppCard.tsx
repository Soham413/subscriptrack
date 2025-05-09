import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import CountUp from 'react-countup';
import { IconType } from 'react-icons';
import { TrendingDown, TrendingUp } from 'lucide-react';

const AppCard = ({ classes, title, content, type, Logo, percentageChange }: { classes: string, title: string, content: any, type: string, Logo: IconType, percentageChange: number | null }) => {
    let insightText = "";
    console.log(percentageChange);
    if (percentageChange === null) {
        insightText = "No subscriptions activity yet";
    } else if (percentageChange === 0) {
        insightText = "You have spent the same as last month.";
        // "You started spending on subscriptions this month";
    } else {
        insightText = ' than last month';
    }
    return (
        <Card className={cn('shadow-md', classes)}>
            <CardHeader className='p-0 flex gap-1 items-center'>
                <Logo /> {title}
            </CardHeader>
            <CardContent className='p-0 flex items-end mt-6'>
                <p className='text-4xl font-bold text-[#222eff] mt-0 mr-2'><CountUp prefix={type === 'price' ? '&#8377;' : ''} end={content} /></p>
                {title === "Monthly Spending" && percentageChange && percentageChange < 0 ? <TrendingDown className='text-red-500' /> : (percentageChange && percentageChange > 0 && <TrendingUp className='text-green-500' />)}
                {title === "Monthly Spending" && <span className={cn('text-xs text-stone-500 mb-1 mr-1',
                        percentageChange !== null &&
                        percentageChange !== 100 &&
                        (percentageChange > 0 ? 'text-green-500' : (percentageChange < 0 ? 'text-red-500' : '')))}>{percentageChange!==null && percentageChange}%</span>}
                {title === "Monthly Spending" &&
                    <span className='text-xs text-stone-500 mb-1'>
                        {insightText}
                    </span>}
            </CardContent>
        </Card>
    )
}

export default AppCard
