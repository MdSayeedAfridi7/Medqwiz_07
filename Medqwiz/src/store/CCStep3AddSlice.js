import { createSlice } from "@reduxjs/toolkit"

const CCStep3AddSlice = createSlice({
    name: "CCStep3AddSlice",
    initialState: null,
    reducers: {
        setCCStep3AddAPI: (state, action) => {
            return action?.payload?.data
        },
        setCCStep3AddAPIReset: (state, action) => {
            return null
        }
    }
})

export const { setCCStep3AddAPI, setCCStep3AddAPIReset } = CCStep3AddSlice.actions
export default CCStep3AddSlice.reducer

