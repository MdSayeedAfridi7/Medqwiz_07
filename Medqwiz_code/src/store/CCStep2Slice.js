import { createSlice } from "@reduxjs/toolkit"

const CCStep2Slice = createSlice({
    name: "CCStep2Slice",
    initialState: null,
    reducers: {
        getCCStep2API: (state, action) => {
            return action?.payload?.data
        },
        setCCStep2APIReset: (state, action) => {
            return null
        }
    }
})

export const { getCCStep2API, setCCStep2APIReset } = CCStep2Slice.actions
export default CCStep2Slice.reducer

