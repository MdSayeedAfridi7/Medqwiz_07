import { createSlice } from "@reduxjs/toolkit"

const CCStepT_F_Slice = createSlice({
    name: "CCStepT_F_Slice",
    initialState: null,
    reducers: {
        setCCStepsTF: (state, action) => {
            return action?.payload?.data
        },
        setCCStepsTFReset: (state, action) => {
            return null
        }
    }
})

export const { setCCStepsTF, setCCStepsTFReset } = CCStepT_F_Slice.actions
export default CCStepT_F_Slice.reducer
