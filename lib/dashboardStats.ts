import { GraphDataType, subscriptionResponseType } from '@/types/subsciption'
import { differenceInDays, parseISO } from 'date-fns'
import { MdPendingActions } from 'react-icons/md'
import { TbReportMoney } from 'react-icons/tb'
import { VscVmActive } from 'react-icons/vsc'

export const getDashboardStats = (subscriptions: subscriptionResponseType[]) => {
  const today = new Date()
  const currentMonth = today.getMonth() // April = 3
  const currentYear = today.getFullYear() // 2025

  // let monthlySpending = 0
  let currentMonthSpend = 0;
  let lastMonthSpend = 0;
  let upcomingRenewals: subscriptionResponseType[] = []
  let categoryBreakdown: Record<string, number> = {}
  let spendingAnalysis = {
    lastMonth: [] as { name: string; y: number }[],
    currentMonth: [] as { name: string; y: number }[],
    last6Months: [] as { name: string; y: number }[],
    lastYear: [] as { name: string; y: number }[],
  }

  const categorySpending: Record<string, number> = {}
  
  console.log('from server', subscriptions);
  subscriptions.map((sub) => {
    
    const startDate = new Date(sub.startDate);
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    
    const renewal = parseISO(sub.renewalDate)
    // console.log(renewal);
    const daysLeft = differenceInDays(renewal, today)
    // console.log(daysLeft);
    
    if (daysLeft >= 0 && daysLeft <= 7) {
      // sub.daysLeft = daysLeft 
      // have to update subscription
      upcomingRenewals.push({...sub, daysLeft})
    }
    console.log(sub.category, sub.startDate);
    
    categoryBreakdown[sub.category] = (categoryBreakdown[sub.category] || 0) + 1
    categorySpending[sub.category] = (categorySpending[sub.category] || 0) + sub.price
    
    const monthsDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth)
    
    const entry = { name: sub.name, y: sub.price }
    
    if (monthsDiff === 0) {
      currentMonthSpend += sub.price;
      spendingAnalysis.currentMonth.push(entry)
    }
    if (monthsDiff === 1) {
      lastMonthSpend += sub.price;
      spendingAnalysis.lastMonth.push(entry)
    }
    if (monthsDiff >= 1 && monthsDiff <= 6) {
      spendingAnalysis.last6Months.push(entry)
    }
    if (monthsDiff >= 1 && monthsDiff <= 12) {
      spendingAnalysis.lastYear.push(entry)
    }
  })
  // console.log('categoryBreakdown', categoryBreakdown);
  
  const categories = Object.entries(categoryBreakdown).map((item) => ({ name: item[0], y: item[1] }))
  const categoryComparison: GraphDataType = {
    series: [{ name: 'Categories', data: categories },],
    xAxis: { categories: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'education', 'other'] }
  }
  // console.log('from server categoryBreakdown', categoryComparison);

  let percentChange = null;
  if (lastMonthSpend === 0 && currentMonthSpend > 0) {
    percentChange = 100;
  } else if (lastMonthSpend === 0 && currentMonthSpend === 0) {
    percentChange = null;
  } else {
    const difference = currentMonthSpend - lastMonthSpend;
    percentChange = Math.round((difference / lastMonthSpend) * 100);
  }

  console.log('from server spendingAnalysis', spendingAnalysis);
  const activeSubscriptions = subscriptions.filter(subs => subs.status === 'active');
  const dashboardsummary = [
    { name: 'Active Subscriptions', value: activeSubscriptions.length, type: 'number', logo: MdPendingActions },
    { name: 'Due Subscriptions', value: upcomingRenewals.length, type: 'number', logo: VscVmActive },
    { name: 'Monthly Spending', value: currentMonthSpend, type: 'price', logo: TbReportMoney }
  ]

  return {
    dashboardsummary,
    upcomingRenewals,
    categoryComparison,
    spendingAnalysis,
    percentChange
  }
}


