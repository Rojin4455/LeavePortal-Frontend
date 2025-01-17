import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentName: "Dashboard"
}

const adminContent = createSlice({
    name:"adminContent",
    initialState,
    reducers: {
        setContent : (state,action) => {
            state.contentName = action.payload.contentName
        },
        clearContent : (state, action) => {
            state.contentName = "Dashboard"
        }
    }
})

export const {setContent, clearContent} = adminContent.actions

export default adminContent.reducer