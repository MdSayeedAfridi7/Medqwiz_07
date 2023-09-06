import { createSlice } from "@reduxjs/toolkit";

const LogoutSlice = createSlice({
    name: "Logout",
    initialState: null,
    reducers: {
        setLogoutAPI: (state, action) => {
            return action?.payload
        },
        resetLogout: (state, action) => {
            return null
        }

    }
})

export const {setLogoutAPI, resetLogout} = LogoutSlice.actions
export default LogoutSlice.reducer