import { createSlice } from "@reduxjs/toolkit";



const userPageSlice = createSlice({
    name: "user_page",
    initialState: [],
    reducers: {
        setSideMenuList: (state, action) => {
            return (action?.payload?.data?.data)
        },
        resetSideMenuAPI: (state, action) => {
            return []
        }
    }
})


export const { setSideMenuList, resetSideMenuAPI } = userPageSlice.actions
export default userPageSlice.reducer