'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineSubscriptions } from 'react-icons/md'
import { RiDashboardHorizontalLine } from 'react-icons/ri'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/sidebar"
import LogoutModal from '../(auth)/LogoutModal'
import { LogOut } from 'lucide-react'
import { IoWalletOutline } from 'react-icons/io5'
import { useIsMobile } from '@/hooks/use-mobile'
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
        // {
        //     label: 'My Profile',
        //     url: '/my-profile',
        //     icon: <LuCircleUser />
        // },
        {
            label: 'Payments',
            url: '/payments',
            icon: <IoWalletOutline />
        },
        {
            label: 'Logout',
            icon: <LogOut />
        }
    ]
    const path = usePathname()
    const isActive = (route: string) => path.includes(route)
    const { open } = useSidebar();
    const [confirmLogout, setconfirmLogout] = useState(false)
    const isMobile = useIsMobile()
    return (
        // <div className='bg-white h-screen w-[15%]'>
        //     <div className="logo p-4 text-center text-[20px] font-bold"><i>SubsTrack</i></div>
        //     <div className='px-3 pb-3 flex flex-col gap-3 text-sm'>
        //         {options.map((item, i) => {
        //             const active = isActive(item.url);
        //             return <Link href={item.url} key={i} className={cn('flex gap-2 px-2 py-1 items-center rounded-sm', active ? 'bg-[#222eff] text-white' : 'hover:bg-[#c8d7ff] hover:text-[#222eff]')}>
        //                         {item.icon}
        //                         {item.label}
        //                    </Link>
        //         })}
        //     </div>

        // </div>
        <Sidebar collapsible='icon' hidden={isMobile}>
            <SidebarHeader className={cn("logo p-4 text-[20px] font-bold", !open && 'mt-8')}>
                {open && <i className='flex justify-center'>SubsTrack</i>}
            </SidebarHeader>
            <SidebarTrigger className={cn("absolute top-5 z-10 cursor-pointer", open ? 'left-44' : 'left-9')} />
            {/* <div ></div> */}
            <SidebarContent className={cn('text-sm', open ? 'p-4' : 'p-2')}>
                <SidebarMenu>
                    {options.map((item) => {
                        const active = isActive(item?.url || '#')
                        return <SidebarMenuItem key={item.label} className={cn('rounded-md min-w-fit mb-1', active ? 'bg-[#222eff] text-white' : 'hover:text-[#222eff]')}>
                            <SidebarMenuButton asChild>
                                {item.label !== 'Logout' ? <Link href={item?.url || '#'}>
                                    {item.icon}{item.label}
                                </Link> : <button onClick={() => setconfirmLogout(true)}>{item.icon}{item.label}</button>}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    })}
                </SidebarMenu>
                {confirmLogout && <LogoutModal needToOpen={confirmLogout} onClose={()=>setconfirmLogout(false)}/>}
                {/* {options.map((item, i) => {
                    const active = isActive(item.url);
                    return <Link href={item.url} key={i} className={cn('flex gap-2 px-2 py-1 items-center rounded-sm', active ? 'bg-[#222eff] text-white' : 'hover:bg-[#c8d7ff] hover:text-[#222eff]')}>
                        {item.icon}
                        {item.label}
                    </Link>
                })} */}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar
