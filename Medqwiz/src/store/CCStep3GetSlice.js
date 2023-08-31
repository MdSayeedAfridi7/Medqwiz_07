import { createSlice } from "@reduxjs/toolkit"

const CCStep3GetSlice = createSlice({
    name: "CCStep3GetSlice",
    initialState: null,
    reducers: {
        setCCStep3GetAPI: (state, action) => {
            return action?.payload?.data
        },
        // AddCCStep3Topic: (state, action) => {
        //     return action?.payload?.data
        // },
        setCCStep3GetAPIReset: (state, action) => {
            return null
        }
    }
})

export const { setCCStep3GetAPI, setCCStep3GetAPIReset } = CCStep3GetSlice.actions
export default CCStep3GetSlice.reducer
