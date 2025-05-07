import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import humanInShirt from '@/public/human-in-shirt-2.png'
import defaultUserLogo from "@/public/user-logo-default.png"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import ProfileForm from './ProfileForm'
import { Pencil, X } from 'lucide-react'


const ProfileModal = ({ needToOpen, onClose }: { needToOpen: boolean, onClose: () => void }) => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const [editMode, setEditMode] = useState(false)
    return (
        <Dialog open={needToOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-between'>Profile Info
                        <DialogClose>
                            <X className="h-4 w-4 cursor-pointer" />
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="profileBody flex p-4 gap-4 max-sm:flex-col max-sm:items-center max-sm:p-2">
                    <div className="left w-1/2 max-sm:w-3/4">
                        {/* <UserCircle /> */}
                        <Image src={defaultUserLogo} alt='Human in shirt' width={400} height={500} />
                    </div>
                    {Object.keys(userInfo).length !== 0 && <div className="right w-1/2 mr-4 max-sm:w-4/5 max-sm:mr-0">
                        {!editMode ? <>
                            <label className="mb-1">Name</label>
                            <p className='text-stone-500 mb-3'>{userInfo.name}</p>
                            <label className="mb-1">Email</label>
                            <p className='text-stone-500 mb-3'>{userInfo.email}</p>
                            <button
                                className='px-4 py-2 flex items-center gap-2 border border-[#222eff] text-[#222eff] rounded-md mt-6 cursor-pointer hover:bg-[#222eff] hover:text-white transition ease-in-out duration-300'
                                onClick={() => setEditMode(true)}
                            ><Pencil size={15} />edit profile</button>
                        </> :
                            <>
                                <ProfileForm user={userInfo} setEditInfo={setEditMode} onClose={onClose}/>
                            </>}
                    </div>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileModal
