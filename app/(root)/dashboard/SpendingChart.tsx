import { spendingData } from '@/lib/dummyData';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import React, { useState } from 'react'
import DoughnutChart from '@/graphs/DoughnutChart';

const SpendingChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('currentMonth')
    const chartData = {
        series: [{ name: "Spending", data: spendingData?.[selectedPeriod as keyof typeof spendingData] }]
    }

    return (
        <div className='w-full bg-white relative rounded-xl'>
            <select className='absolute right-0 z-10' onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                <option value="currentMonth">Current Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="last6Months">6 months</option>
                <option value="lastYear">Last Year</option>
            </select>

            <DoughnutChart key={selectedPeriod} data={chartData} heading="Subscription Spending" chartType='area'/>
        </div>
    )
}

export default SpendingChart
