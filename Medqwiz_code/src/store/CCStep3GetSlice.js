import { createSlice } from "@reduxjs/toolkit"

const CCStep3GetSlice = createSlice({
    name: "CCStep3GetSlice",
    initialState: [],
    reducers: {
        setCCStep3GetAPI: (state, action) => {
            return action?.payload?.data
        },
        AddCCStep3CardDetails: (state, action) => {
            console.log("adding", action?.payload?.data)
            return state?.concat(action?.payload?.data)
        },

        deleteCCStep3CardDetails: (state, action) => {
            console.log("deleting", action?.payload?.deletePayload)
            console.log("id", action?.payload?.id);

            return state?.map((item) => {
                if (item?.id === action?.payload?.id) {
                    return { ...item, media: item?.media?.filter((medialist) => medialist?.id !== action?.payload?.deletePayload?.id) }
                } else {
                    return (
                        item
                    )
                }
            })
        },

        uploadCCStep3CardDetails: (state, action) => {
            console.log("upload");
        },

        setCCStep3GetAPIReset: (state, action) => {
            return []
        }
    }
})

export const { setCCStep3GetAPI, AddCCStep3CardDetails, setCCStep3GetAPIReset, deleteCCStep3CardDetails, uploadCCStep3CardDetails } = CCStep3GetSlice.actions
export default CCStep3GetSlice.reducer


