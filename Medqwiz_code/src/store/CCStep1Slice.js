import { createSlice } from "@reduxjs/toolkit"

const CCStep1Slice = createSlice({
    name: "CCStep1Slice",
    initialState: null,
    reducers: {
        setCCStep1API: (state, action) => {
            return action?.payload?.data
        },
        setCCStep1APIReset: (state, action) => {
            return null
        }
    }
})

export const { setCCStep1API, setCCStep1APIReset } = CCStep1Slice.actions
export default CCStep1Slice.reducer

