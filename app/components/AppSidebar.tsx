'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuCircleUser } from 'react-icons/lu'
import { MdOutlineSubscriptions } from 'react-icons/md'
import { RiDashboardHorizontalLine } from 'react-icons/ri'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/sidebar"

const AppSidebar = () => {
    const options = [
        {
            label: 'Dashboard',
            url: '/dashboard',
            icon: <RiDashboardHorizontalLine />
        },
        {
            label: 'Subscriptions',
            url: '/subscriptions',
            icon: <MdOutlineSubscriptions />
        },
        {
            label: 'My Profile',
            url: '/my-profile',
            icon: <LuCircleUser />
        }
    ]
    const path = usePathname()
    const isActive = (route: string) => path.includes(route)
    return (
        <div className='bg-white h-screen w-[15%]'>
            <div className="logo p-4 text-center text-[20px] font-bold"><i>SubsTrack</i></div>
            <div className='px-3 pb-3 flex flex-col gap-3 text-sm'>
                {options.map((item, i) => {
                    const active = isActive(item.url);
                    return <Link href={item.url} key={i} className={cn('flex gap-2 px-2 py-1 items-center rounded-sm', active ? 'bg-[#222eff] text-white' : 'hover:bg-[#c8d7ff] hover:text-[#222eff]')}>
                                {item.icon}
                                {item.label}
                           </Link>
                })}
            </div>

        </div>
        // <Sidebar>
        //     {/* <SidebarHeader /> */}
        //     <div className="logo p-4 text-[20px] font-bold"><i>SubsTrack</i></div>
        //     <SidebarContent>
        //         {options.map((item, i) => {
        //             const active = isActive(item.url);
        //             return <Link href={item.url} key={i} className={cn('flex gap-2 px-2 py-1 items-center', active ? 'bg-[#222eff] text-white' : 'hover:bg-[#c8d7ff] hover:text-[#222eff]')}>
        //                 {item.icon}
        //                 {item.label}
        //             </Link>
        //         })}
        //     </SidebarContent>
        //     <SidebarFooter />
        // </Sidebar>
    )
}

export default AppSidebar
