import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { GraphDataType } from '../types/subsciption';
import NotFound from '@/app/components/NotFound';

type chartProps = {data: GraphDataType, 
    chartType: string, 
    heading: string, 
    chartRef?: React.RefObject<HighchartsReact.RefObject>, 
    height: string | number
}

export default function Chart({ data, chartType, heading, chartRef, height }: chartProps) {
    // const transformedData = transformReportData();
    console.log('data for chart',data);
    
    const chartOptions = {
        chart: {
            type: chartType,
            height: height,
            // width: '100%'
        },
        colors: ['#222eff', '#666eff', '#6367b0', '#1c206d'],
        title: {
            text: heading,
        },
        xAxis: {
            categories: data?.xAxis?.categories,
            title: {
                // text: 'Products',
            },
        },
        yAxis: {
            min: 0,
            title: {
                // text: 'Inventory Quantity',
            },
        },
        series: data?.series,
        plotOptions: {
            series: {
                // allowPointSelect: true,
                // cursor: 'pointer',
                // borderRadius: 8,
                // dataLabels: [{
                //     enabled: true,
                //     distance: 20,
                //     format: '{point.name}'
                // }, {
                //     enabled: true,
                //     distance: -20,
                //     format: '{point.percentage:.0f}%',
                //     style: {
                //         fontSize: '0.9em'
                //     }
                // }],
                showInLegend: false,
            }
        },
    };

    return (
        <div className='h-[100%]'>
            {data?.series[0]?.data.length > 0 ? <HighchartsReact
                highcharts={Highcharts}
                ref={chartRef}
                options={chartOptions}
                containerProps={{
                    style: { width: '100%', height: '100%', borderRadius: '1vw' },
                }}
            /> : <NotFound message='graph' classes='h-full'/>}
        </div>
    );
}
