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
                const { email, username, firstName, lastName, _id, image } = payload.user
                state.currentUser = { email, username, firstName, lastName, _id, image }
                state.token = payload.token

            }
            if (payload.data) {
                const { email, username, firstName, lastName, _id } = payload.data
                state.currentUser = { email, username, firstName, lastName, _id}
                state.token = payload.token
            }
        },
        cleanUserData: (state, { }) => {
            state.currentUser = null;
            state.token = null
        },
        updateUserData: (state, { payload }) => {
            const { username, email, image } = payload
            state.currentUser.username = username
            state.currentUser.email = email
            state.currentUser.image = image
        }

    }

})


export const { fillUserData, cleanUserData, updateUserData } = authSlice.actions

export default authSlice.reducer
