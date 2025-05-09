import { getUserDetails } from "@/lib/fetchUser";
import { RootState } from "@/store/store";
import { setUserInfo } from "@/store/userSlice";
import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import defaultUserLogo from "@/public/user-logo-default.png"
import { LuCircleUser } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu";
import LogoutModal from "@/app/(auth)/LogoutModal";
import ProfileModal from "@/app/(root)/my-profile/ProfileModal";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "@/app/components/MobileNavbar";

const Navbar = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '')
                const userDetails = await getUserDetails(user._id)
                console.log('userDetails from profile', userDetails);
                if (!userDetails.success) {
                    toast.error(userDetails.message || 'Something went wrong')
                }
                else dispatch(setUserInfo(userDetails.data));
            } catch (error: any) {
                toast.error(error.message || 'Error getting profile info')
            }
        }
        getUserInfo()
    }, [])
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const isMobile = useIsMobile()
    const [confirmLogout, setconfirmLogout] = useState(false)
    const [viewProfile, setViewProfile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const options = [
        {
            label: 'My Profile',
            // url: '/my-profile',
            icon: <LuCircleUser />,
            onClicking: () => {
                setViewProfile(true)
                setMenuOpen(false)
            }
        },
        {
            label: 'Logout',
            icon: <LogOut />,
            onClicking: () => {
                setconfirmLogout(true)
                setMenuOpen(false)
            }
        }
    ]
    return (
        <nav className="h-16 sticky top-0 bg-white shadow-md flex justify-between items-center px-6 max-sm:px-2">
            <div className="left">
                {!isMobile ?
                    <h1 className="text-lg font-semibold max-sm:text-base">Welcome to Subscription Tracker</h1> : 
                    <button className="text-xl font-semibold " title="Welcome to Subscription Tracker"><i>SubsTrack</i></button>
                }
            </div>
            <div className="flex gap-4 items-center max-sm:gap-1">
                {/* <Bell className="text-xl" /> */}
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger className="flex gap-2 hover:bg-accent p-2 hover:rounded-full cursor-pointer text-sm items-center">
                        <p className="max-w-[80px] truncate overflow-hidden">{userInfo.name || ''}</p>
                        {/* <CircleUserRound className="text-xl" /> */}
                        <Image src={defaultUserLogo} alt="Welcome" width={15} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {options.map((option, i) => (
                            <DropdownMenuItem key={i}><button className="flex gap-2 items-center cursor-pointer" onClick={option.onClicking}>{option.icon} {option.label}</button></DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {isMobile && <MobileNavbar />}
                {confirmLogout && <LogoutModal needToOpen={confirmLogout} onClose={() => setconfirmLogout(false)} />}
                {viewProfile && <ProfileModal needToOpen={viewProfile} onClose={() => setViewProfile(false)} />}
            </div>
        </nav>
    )
}

export default Navbar;