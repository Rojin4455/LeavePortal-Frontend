import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentName: "current-status"
}

const userContent = createSlice({
    name:"userContent",
    initialState,
    reducers: {
        setContent : (state,action) => {
            state.contentName = action.payload.contentName
        },
        clearContent : (state, action) => {
            state.contentName = "current-status"
        }
    }
})

export const {setContent, clearContent} = userContent.actions

export default userContent.reducer