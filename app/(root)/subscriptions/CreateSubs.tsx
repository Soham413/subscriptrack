'use client'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { CalendarPlus, Plus } from 'lucide-react'
import CustomInput from '@/app/components/CustomInput'
import SelectDropdown from '@/app/components/SelectDropdown'
import { subsCategory, subsFrequency } from '@/lib/dummyData'
import DatePicker from '@/app/components/DatePicker'
import FileUploader from '@/app/components/FileUploader'
import { useForm } from 'react-hook-form'
import { createSubscription } from '@/lib/fetchSubscription'
import { addToSubscriptionList } from '@/store/subscriptionSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addPayment } from '@/lib/fetchPayments'
import Spinner from '@/app/components/Spinner'
import { useIsMobile } from '@/hooks/use-mobile'

const CreateSubs = () => {
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            console.log('subscription create', data);
            data.paymentMethod = 'Credit Card';
            const formData = new FormData();
            formData.append('name', data.name)
            formData.append('price', data.price)
            formData.append('category', data.category)
            formData.append('frequency', data.frequency)
            formData.append('startDate', data.startDate.toISOString())
            formData.append('renewalDate', data.renewalDate.toISOString())
            formData.append('subLogo', data.subLogo)
            formData.append('paymentMethod', data.paymentMethod)

            const response = await createSubscription(formData);
            console.log('response', response);
            if (response.success) {
                dispatch(addToSubscriptionList(response.data))
                setOpen(false);
                toast.success('Subscription created successfully')
                console.log(response.data._id);
                const body = {'startDate': response.data.startDate, 'userId': response.data.user, 'renewalDate': response.data.renewalDate} 
                const addPaymentResponse = await addPayment(response.data._id, body)
                console.log('addPaymentResponse', addPaymentResponse);
            }
            else {
                console.log(response.data);
                console.log(response.message);

                toast.error(response.message || 'Failed to add subscription')
            }
        } catch (error: any) {
            // console.log(error);
            toast.error(error.response.data?.message || error.message || 'Failed to add subscription')
        }
        finally{
            setLoading(false)
        }


    }
    const startDate = watch("startDate");
    const frequency = watch("frequency"); // get current selected frequency

    const calculateRenewalDate = (start: Date, frequency: string) => {
        const renewalDate = new Date(start);
        switch (frequency) {
            case 'weekly':
                renewalDate.setDate(renewalDate.getDate() + 7)
                break;
            case 'monthly':
                renewalDate.setMonth(renewalDate.getMonth() + 1)
                break;
            case 'quarterly':
                renewalDate.setMonth(renewalDate.getMonth() + 3 )
                break;
            case 'yearly':
                renewalDate.setFullYear(renewalDate.getFullYear() + 1)
                break;
            default:
                break;
        }
        return renewalDate
    }

    const calculatedDate = useMemo(() => {
        const renewalDate = frequency && startDate && calculateRenewalDate(startDate, frequency)
        return renewalDate;
    }, [frequency, startDate])

    useEffect(() => {
        if (calculatedDate) {
            setValue("renewalDate", calculatedDate);
        }
    }, [calculatedDate]);
    const isMobile = useIsMobile()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isMobile ? 
            <DialogTrigger className='bg-[#222eff] text-white rounded-lg flex gap-2 items-center p-2 text-sm cursor-pointer' title='Add Subscription'><CalendarPlus size={18} /> Add Subscription</DialogTrigger> : 
            <DialogTrigger className='bg-[#222eff] text-white rounded-full flex gap-2 items-center p-3 font-bold text-2xl cursor-pointer' title='Add Subscription'><Plus /></DialogTrigger>}
            <DialogContent className='max-h-[90%] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Create subscription</DialogTitle>
                    <DialogDescription>
                        Fill the details below
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='sm:grid sm:grid-cols-2 gap-2 w-full'>

                    <CustomInput
                        title='Name'
                        id='name'
                        className='w-56 max-sm:w-full mb-2'
                        placeholder='Enter subscription name'
                        type='text'
                        register={register}
                        validation={{
                            required: { value: true, message: "Name is required" },
                            minLength: { value: 3, message: "Name must be at least 3 characters" }
                        }}
                        error={errors.name?.message as string}
                    />

                    <CustomInput title='Price'
                        id='price'
                        className='w-56 max-sm:w-full mb-2'
                        placeholder='Enter price'
                        type='number'
                        register={register}
                        validation={{
                            required: { value: true, message: "Price is required" },
                            min: { value: 1, message: "Price should not be 0" }
                        }}
                        error={errors.price?.message as string}
                    />

                    <SelectDropdown
                        title='Category'
                        className='w-56 max-sm:w-full mb-2'
                        placeholder='Select category'
                        options={subsCategory}
                        id='category'
                        control={control}
                        validation={{ required: "Category is required" }}
                        error={errors.category?.message as string}
                    />

                    <SelectDropdown
                        title='Frequency'
                        className='w-56 max-sm:w-full mb-2'
                        placeholder='e.g. Monthly'
                        options={subsFrequency}
                        id='frequency'
                        control={control}
                        validation={{ required: "Frequency is required" }}
                        error={errors.frequency?.message as string}
                    />


                    <DatePicker
                        title='Start Date'
                        className='w-56 max-sm:w-full mb-2'
                        id='startDate'
                        validation={{
                            required: "Start date is required",
                            validate: (value: Date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                if (!value) return "Start Date is required";
                                if (value < today) return "Start Date cannot be in the past";
                                return true;
                            },
                        }}
                        frequency={frequency}
                        error={errors.startDate?.message as string}
                        control={control}
                        setValue={setValue}
                    />

                    <DatePicker
                        title='Renewal Date'
                        className='w-56 max-sm:w-full mb-2'
                        id='renewalDate'
                        // validation={ }
                        error={errors.startDate?.message as string}
                        control={control}
                        calculatedDate={calculatedDate}
                    />

                    <FileUploader
                        id='subLogo'
                        register={register}
                        control={control}
                        validation={{
                            required: "Logo is required",
                        }}
                        error={errors.subLogo?.message as string}
                    />
                    <br />
                    <div className="options w-full col-span-2 mt-2 flex justify-between">
                        <DialogClose className='px-3 py-1 rounded-sm border-[#222eff] text-[#222eff] border text-sm cursor-pointer'>Close</DialogClose>
                        <button className='px-3 py-1 rounded-sm border-[#222eff] text-white bg-[#222eff] text-sm cursor-pointer flex items-center gap-2' type='submit' disabled={loading}>Create {loading && <Spinner color='#fff' width={20} height={20}/>}</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSubs
