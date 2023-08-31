import { createSlice } from "@reduxjs/toolkit"

const CCStep3PostSlice = createSlice({
    name: "CCStep3PostSlice",
    initialState: null,
    reducers: {
        setCCStep3PostAPI: (state, action) => {
            return action?.payload?.data
        },
        setCCStep3PostAPIReset: (state, action) => {
            return null
        }
    }
})

export const { setCCStep3PostAPI, setCCStep3PostAPIReset } = CCStep3PostSlice.actions
export default CCStep3PostSlice.reducer
