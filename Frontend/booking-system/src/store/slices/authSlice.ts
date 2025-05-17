import type { AuthState, User } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



const initialState: AuthState = {
    data: null,
    token: null,
    isAuthenticated: false,

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ data: User; token: string }>) => {
            state.isAuthenticated = true
            state.data = action.payload.data
            state.token = action.payload.token
        },

        logoutSuccess: (state) => {
            state.data = null
            state.token = null
            state.isAuthenticated = false
        },
    },
})

export const {
    loginSuccess,
    logoutSuccess,
} = authSlice.actions

export default authSlice.reducer 