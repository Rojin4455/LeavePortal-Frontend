import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentName: "users"
}

const managerContent = createSlice({
    name:"managerContent",
    initialState,
    reducers: {
        setContent : (state,action) => {
            state.contentName = action.payload.contentName
        },
        clearContent : (state, action) => {
            state.contentName = "users"
        }
    }
})

export const {setContent, clearContent} = managerContent.actions

export default managerContent.reducer