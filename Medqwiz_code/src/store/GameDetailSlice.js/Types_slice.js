import { createSlice } from "@reduxjs/toolkit";

const Types_slice = createSlice({
    name: "Types_slice",
    initialState: null,
    reducers: {
        get_game_types: (state,action) => {
            console.log("types", action?.payload?.data);
            return action.payload?.data
        },
    }
})

export const { get_game_types } = Types_slice.actions;
export default Types_slice.reducer