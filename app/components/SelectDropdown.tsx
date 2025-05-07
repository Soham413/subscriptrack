import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { selectOptionType } from '@/types/subsciption'
import { Controller } from 'react-hook-form'

type AuthDropdownProps = {
    title?: string;
    id: string;
    className: string;
    placeholder: string;
    options: selectOptionType;
    error?: string;
    validation?: object;
    control?: any;
};

const SelectDropdown = ({ title, id, className, placeholder, options, control, validation, error }: AuthDropdownProps) => {
    return (
        <div className='flex flex-col gap-1 text-sm'>
            <Controller
                name={id}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <>
                        <label>{title}</label>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={cn("w-[180px]", className)}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((item: { name: string, value: string }, i) => (
                                    <SelectItem value={item.value} key={i} className='hover:bg-accent rounded cursor-pointer'>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </>
                )} />
                {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default SelectDropdown
