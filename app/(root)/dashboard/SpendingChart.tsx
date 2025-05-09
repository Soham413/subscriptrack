import { spendingData } from '@/lib/dummyData';
import React, { useState } from 'react'
import Chart from '@/graphs/Chart';
// import { useSidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';

const SpendingChart = ({ spendingAnalysis }: { spendingAnalysis: typeof spendingData, loading: boolean }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('currentMonth')
    const chartData = {
        series: [{ name: "Spending", data: spendingAnalysis?.[selectedPeriod as keyof typeof spendingData] }]
    }
    // const { open } = useSidebar()
    return (
        <div className={cn('bg-white rounded-xl p-2 lg:w-1/2')}>
            <div className="flex mb-4 h-[10%] justify-between">
                <div className="w-1/4"></div>
                <p className='text-[1.2em] font-bold text-[#333]'>Subscription Spending</p>
                <div className="w-1/4 flex justify-end items-center">
                    <select className='h-fit text-sm' onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                        <option value="currentMonth">Current Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last6Months">6 months</option>
                        <option value="lastYear">Last Year</option>
                    </select>
                </div>
            </div>

            <Chart key={selectedPeriod} data={chartData} heading="" chartType='column' height={320} />
        </div>
    )
}

export default SpendingChart
