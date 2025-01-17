import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken:null,
    refreshToken:null,
    userType:'anonymous',
    userName:null,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userType = action.payload.userType
            state.userName = action.payload.userName
        },
        clearUser: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userType = "anonymous"
            state.userName = null

        }
    }
})




export const {setUser, clearUser} = userSlice.actions

export default userSlice.reducer