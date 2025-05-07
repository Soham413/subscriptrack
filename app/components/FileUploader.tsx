'use client'
import { ImageUp, RotateCcw } from 'lucide-react'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

const FileUploader = ({ register, id, error, validation, control }: { register: any, id: string, error?: string, validation?: object, control: any }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        console.log(e.target.files?.[0])
        const file = e.target.files?.[0];
        if (!file) return;
        if (e.target.files?.[0].type !== 'image/jpeg' && e.target.files?.[0].type !== 'image/jpg' && e.target.files?.[0].type !== 'image/png') {
            console.log('Upload image only');
            toast.error('Please upload a valid image (jpg, jpeg, png)');
            e.target.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size should be less than 2MB');
            return;
        }

        // Preview image
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        field.onChange(file)
        e.target.value = ''; //reset input
    }
    return (
        <Controller
            name={id}
            control={control}
            rules={validation}
            render={({ field }) => (
                <div className='flex flex-col gap-1 text-sm'>
                    <label className='flex items-center justify-between'>Upload logo {previewImage != null && <button className='cursor-pointer' onClick={() => setPreviewImage(null)}><RotateCcw size={15} /></button>}</label>
                    {previewImage ? <img src={previewImage} alt="" className='w-56 h-52 object-cover rounded-lg max-sm:w-full' />
                        : <label htmlFor={id} className='text-xs flex flex-col justify-center items-center bg-accent rounded-lg border w-56 h-52 cursor-pointer max-sm:w-full'><ImageUp size={20} />
                            <p>Upload logo here</p>
                        </label>}
                    <input type='file' accept=".jpg,.jpeg,.png" id={id} onChange={(e) => onFileChange(e, field)} className='hidden' />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
            )}
        />
    )
}

export default FileUploader
