import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentName: "Team Members"
}

const managerContent = createSlice({
    name:"managerContent",
    initialState,
    reducers: {
        setContent : (state,action) => {
            state.contentName = action.payload.contentName
        },
        clearContent : (state, action) => {
            state.contentName = "Team Members"
        }
    }
})

export const {setContent, clearContent} = managerContent.actions

export default managerContent.reducer