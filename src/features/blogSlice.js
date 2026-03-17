import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    loading: false,
    blogs: null,
    categories: null,
}

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers: {
        fillEndpoints: ((state, {payload}) => {
            const {endpoint, data} = payload
            state[endpoint] = data.data
        })
    }
})


export const {fillEndpoints} = blogSlice.actions

export default blogSlice.reducer