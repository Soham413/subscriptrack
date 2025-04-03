import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { GraphDataType } from '../types/subsciption';

export default function DoughnutChart({ data, chartType, heading }: {data: GraphDataType, chartType: string, heading: string}) {
    // const transformedData = transformReportData();
    console.log('data for chart',data);
    
    const chartOptions = {
        chart: {
            type: chartType,
            // height: '100%',
            // width: '100%'
        },
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
        // plotOptions: {
        //     series: {
        //         allowPointSelect: true,
        //         cursor: 'pointer',
        //         borderRadius: 8,
        //         dataLabels: [{
        //             enabled: true,
        //             distance: 20,
        //             format: '{point.name}'
        //         }, {
        //             enabled: true,
        //             distance: -20,
        //             format: '{point.percentage:.0f}%',
        //             style: {
        //                 fontSize: '0.9em'
        //             }
        //         }],
        //         showInLegend: true
        //     }
        // },
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                containerProps={{
                    style: { width: '100%', borderRadius: '1vw' },
                }}
            />
        </div>
    );
}
