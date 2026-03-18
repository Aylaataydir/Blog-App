import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    token: null
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fillUserData: (state, { payload }) => {
            if (payload.user) {
                const { email, username, firstName, lastName, _id } = payload.user
                state.currentUser = { email, username, firstName, lastName, _id }
                state.token = payload.token
    
            }
            if (payload.data) {
                const { email, username, firstName, lastName } = payload.data
                state.currentUser = { email, username, firstName, lastName }
                state.token = payload.token
            }



        },
        cleanUserData: (state, { }) => {
            state.currentUser = null;
            state.token = null
        }

    }

})


export const { fillUserData, cleanUserData } = authSlice.actions

export default authSlice.reducer
