"use client"
import React from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Controller } from 'react-hook-form'
import { CustomPopover } from '@/components/ui/CustomPopover'

type AuthDatePickerProps = {
    title: string;
    className: string;
    id: string;
    control: any;
    error?: string;
    validation?: object;
    frequency?: string;
    setValue?: any;
    calculatedDate?: Date;
}

const DatePicker = ({ title, id, className, validation, control, error, calculatedDate }: AuthDatePickerProps) => {
    // const [date, setDate] = React.useState<Date>()
    return (
        <div className='flex flex-col gap-1 text-sm'>
            <Controller
                name={id}
                control={control}
                rules={validation}
                render={({ field }) => {
                    const handleDateChange = (date: Date | undefined) => {
                        console.log(date);
                        field.onChange(date);
                        console.log('calculatedDate', calculatedDate);
                    };
                    return <>
                        <label>{title}</label>
                        <Popover modal={false}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal", className,
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                                    {field.value ? format(field.value, "PPP") : (calculatedDate ? format(calculatedDate, "PPP") : <span>Pick a date</span>)}
                                </Button>
                            </PopoverTrigger>
                            <CustomPopover className="w-auto p-0">
                                {/* <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                /> */}
                                {calculatedDate ?
                                    <Calendar
                                        mode="single"
                                        selected={calculatedDate}
                                        onSelect={() => {}}
                                        disabled={true}
                                        initialFocus
                                    /> :
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                }

                            </CustomPopover>
                        </Popover>
                    </>
                }}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default DatePicker
