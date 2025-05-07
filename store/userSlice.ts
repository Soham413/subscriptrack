import { userType } from "@/app/(root)/my-profile/page"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type stateType = {
    userInfo: userType
}

const initialState: stateType = {
    userInfo: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<userType>) => {
            state.userInfo = action.payload
        }
    }
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer