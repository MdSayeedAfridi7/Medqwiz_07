import { createSlice } from "@reduxjs/toolkit"

const CCStep3GetSlice = createSlice({
    name: "CCStep3GetSlice",
    initialState: [],
    reducers: {
        setCCStep3GetAPI: (state, action) => {
            return action?.payload?.data
        },
        AddCCStep3CardDetails: (state, action) => {
            return state?.concat(action?.payload?.data)
        },

        deleteCCStep3CardImage: (state, action) => {

            console.log("delete", action?.payload);

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

        deleteCCStep3Card: (state, action) => {
            return state?.filter((e) => e?.id !== action?.payload?.deleteCardPayload[0]?.id)
        },

        uploadCCStep3CardDetails: (state, action) => {

            return state?.map((item) => {
                if (item?.id === action?.payload?.id) {
                    return { ...item, media: item?.media?.concat(action?.payload?.res?.data) }
                } else {
                    return (
                        item
                    )
                }
            })
        },

        setContextCardDetails: (state, action) => {

            return state?.map((item) => {
                if (item?.id === action?.payload?.id && item.type === action?.payload?.type) {
                    return action?.payload
                } else {
                    return (
                        item
                    )
                }
            })
        },

        setCCStep3GetAPIReset: (state, action) => {
            return []
        }
    }
})

export const { setCCStep3GetAPI, AddCCStep3CardDetails, setCCStep3GetAPIReset, deleteCCStep3CardImage, deleteCCStep3Card, uploadCCStep3CardDetails, setContextCardDetails } = CCStep3GetSlice.actions
export default CCStep3GetSlice.reducer


