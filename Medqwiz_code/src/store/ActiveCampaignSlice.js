import { createSlice } from "@reduxjs/toolkit";

const ActiveCampaignSlice = createSlice({
    name: "ActiveCampaign",
    initialState: [],
    reducers: {
        setActiveCampaign: (state,action) => {
            console.log(action?.payload);
            return action.payload
        },
    }
})

export const { setActiveCampaign } = ActiveCampaignSlice.actions;
export default ActiveCampaignSlice.reducer