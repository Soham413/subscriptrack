import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { RiDashboardHorizontalLine } from 'react-icons/ri'
import { MdOutlineSubscriptions } from 'react-icons/md'
import { IoWalletOutline } from 'react-icons/io5'
import { LogOut, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import LogoutModal from '../(auth)/LogoutModal'

const MobileNavbar = () => {
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
            icon: <LogOut size={15}/>
        }
    ]
    const path = usePathname()
    const isActive = (route: string) => path.includes(route)
    const [confirmLogout, setconfirmLogout] = useState(false)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className='cursor-pointer'><Menu /></Button>
            </SheetTrigger>
            <SheetContent className='w-[200px] text-sm flex flex-col gap-0 flex-1' side='left'>
                <SheetHeader className="logo p-4 text-[20px] font-bold">
                    <SheetTitle><i className='flex justify-center'>SubsTrack</i></SheetTitle>
                </SheetHeader>
                <ul className='flex flex-col gap-1 w-full p-4'>
                    {options.map((item) => {
                        const active = isActive(item?.url || '#')
                        return <li key={item.label} className={cn('rounded-md min-w-fit mb-1', active ? 'bg-[#222eff] text-white' : 'hover:text-[#222eff]')}>
                                {item.label !== 'Logout' ? <Link href={item?.url || '#'} className='w-full flex items-center p-2 gap-2 overflow-hidden cursor-pointer'>
                                    {item.icon}{item.label}
                                </Link> : <button onClick={() => setconfirmLogout(true)} className='w-full flex items-center p-2 gap-2 overflow-hidden cursor-pointer'>{item.icon}{item.label}</button>}
                        </li>
                    })}
                </ul>
                {confirmLogout && <LogoutModal needToOpen={confirmLogout} onClose={()=>setconfirmLogout(false)}/>}
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavbar
