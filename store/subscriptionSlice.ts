import { subscriptionResponseType } from "@/types/subsciption"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type stateType = {
    subscriptionList: subscriptionResponseType[];
    viewMode: 'card' | 'table';
    category: string;
    frequency: string;
    isActive: 'active' | 'expired';
    searchKeyword: string;
}

const initialState: stateType = {
    subscriptionList: [],
    viewMode: 'card',
    category: '',
    frequency: '',
    isActive: 'active',
    searchKeyword: '',
}

export const subscriptionSlice = createSlice({
    name: 'allSubscriptions',
    initialState,
    reducers: {
        setSubscriptionList: (state, action: PayloadAction<subscriptionResponseType[]>) => {
            state.subscriptionList = action.payload
        },
        addToSubscriptionList: (state, action: PayloadAction<subscriptionResponseType>) => {
            state.subscriptionList = [...state.subscriptionList, action.payload]
        },
        setViewMode: (state, action: PayloadAction<'card' | 'table'>) => {
            state.viewMode = action.payload
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
        resetCategory: (state) => {
            state.category = ''
        },
        setFrequency: (state, action: PayloadAction<string>) => {
            state.frequency = action.payload
        },
        resetFrequency: (state) => {
            state.frequency = ''
        },
        setIsActive: (state, action:PayloadAction<'active' | 'expired'>) => {
            state.isActive = action.payload
        },
        setSearchKeyword: (state, action: PayloadAction<string>) => {
            state.searchKeyword = action.payload
        },
        resetSearchKeyword: (state) => {
            state.searchKeyword = ''
        },
    }
})

export const { setSubscriptionList, addToSubscriptionList, setViewMode, setCategory, resetCategory, setFrequency, resetFrequency, setIsActive, setSearchKeyword, resetSearchKeyword } = subscriptionSlice.actions
export default subscriptionSlice.reducer