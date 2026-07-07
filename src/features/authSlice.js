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

            console.log(payload.user)
            const { email, username, firstName, lastName, _id, avatar } = payload.user
            state.currentUser = { email, username, firstName, lastName, _id, avatar }
            state.token = payload.bearer.accessToken
        },
        cleanUserData: (state, { }) => {
            state.currentUser = null;
            state.token = null
        },
        updateUserData: (state, { payload }) => {
            const { username, email, avatar } = payload
            state.currentUser.username = username
            state.currentUser.email = email
            state.currentUser.avatar = avatar
        }

    }

})


export const { fillUserData, cleanUserData, updateUserData } = authSlice.actions

export default authSlice.reducer
