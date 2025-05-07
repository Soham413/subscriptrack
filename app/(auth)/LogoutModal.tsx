import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'


const LogoutModal = ({needToOpen, onClose}: {needToOpen: boolean, onClose: () => void}) => {
    const router = useRouter()
    const logout = () => {
        onClose();
        router.push('/sign-in')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    return (
        <Dialog open={needToOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent className='w-80'>
                <DialogHeader>
                    <DialogTitle className='text-center'>Logout confirmation</DialogTitle>
                    <DialogDescription className='text-center'>
                        Are you sure that you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <div className="options flex justify-around pt-2">
                    <DialogClose onClick={onClose} className='px-3 py-1 rounded-sm border-[#222eff] text-[#222eff] border text-sm cursor-pointer'>Cancel</DialogClose>
                    <DialogClose onClick={logout} className='px-3 py-1 rounded-sm border-[#222eff] text-white bg-[#222eff] text-sm cursor-pointer'>Logout</DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutModal
