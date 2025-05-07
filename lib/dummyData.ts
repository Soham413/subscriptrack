import amazonPrime from '@/public/amazon_prime.png'
import spotify from '@/public/spotify.png'
import figma from '@/public/figma.png'
import linkedin from '@/public/linkedin.png'
import { GraphDataType } from '@/types/subsciption';
import { MdPendingActions } from 'react-icons/md';
import { VscVmActive } from 'react-icons/vsc';
import { TbReportMoney } from 'react-icons/tb';

export const section1Content = [
    { name: 'Active Subscriptions', value: 6, type: 'number', logo: MdPendingActions },
    { name: 'Due Subscriptions', value: 2, type: 'number', logo: VscVmActive},
    { name: 'Monthly Spending', value: 260, type: 'price', logo:  TbReportMoney}
]
export const section2Content = [
    { name: 'Spotify', price: 70, daysLeft: 3, logo: spotify },
    { name: 'Figma', price: 50, daysLeft: 5, logo: figma },
    { name: 'Amazon Prime', price: 100, daysLeft: 8, logo: amazonPrime },
    { name: 'Linkedin Premium', price: 40, daysLeft: 2, logo: linkedin }
]      // spotify, netflix, amazon prime, jio hotstar

export const categoryComparison: GraphDataType = {
    series: [{ name: 'Categories', data: [{ name: 'Entertainment', y: 3 }, { name: 'Sports', y: 1 }, { name: 'Finance', y: 1 }, { name: 'Lifestyle', y: 2 }] },],
    xAxis: { categories: ['Entertainment', 'Sports', 'Finance', 'Lifestyle'] }
}

export const spendingData = {
    lastMonth: [
        { name: "Netflix", y: 150 },
        { name: "Spotify", y: 70 },
        { name: "Amazon Prime", y: 100 },
    ],
    currentMonth: [
        { name: "Netflix", y: 150 },
        { name: "Spotify", y: 70 },
        { name: "Linkedin Premium", y: 40 },
    ],
    last6Months: [
        { name: "Netflix", y: 900 },
        { name: "Spotify", y: 240 },
        { name: "Amazon Prime", y: 300 },
        { name: "Gym Membership", y: 240 },
        { name: "YouTube", y: 250 },
    ],
    lastYear: [
        { name: "Netflix", y: 1800 },
        { name: "Spotify", y: 480 },
        { name: "Amazon Prime", y: 600 },
        { name: "Gym Membership", y: 480 },
        { name: "YouTube", y: 500 },
    ]
};

export const subsCategory = [
    {name: 'Sports', value: 'sports'},
    {name: 'Entertainment', value: 'entertainment'},
    {name: 'News', value: 'news'},
    {name: 'Lifestyle', value: 'lifestyle'},
    {name: 'Technology', value: 'technology'},
    {name: 'Politics', value: 'politics'},
    {name: 'Fashion', value: 'fashion'},
    {name: 'Finance', value: 'finance'},
    {name: 'Education', value: 'education'},
    {name: 'Other', value: 'other'},
]

export const subsFrequency = [
    {name: 'Daily', value: 'daily'},
    {name: 'Weekly', value: 'weekly'},
    {name: 'Monthly', value: 'monthly'},
    {name: 'Quarterly', value: 'quarterly'},
    {name: 'Yearly', value: 'yearly'},
]

