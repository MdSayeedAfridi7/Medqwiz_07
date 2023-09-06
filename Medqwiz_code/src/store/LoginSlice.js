
import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        setLogin: (state,action) => {
            return action.payload
        },
        resetState:(state,action) => {
            return null
        },
        
    }
})


export const { setLogin, resetState } = loginSlice.actions;
export default loginSlice.reducer


