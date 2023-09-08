import { createSlice } from "@reduxjs/toolkit";

const Create_game_post_slice = createSlice({
    name: "Create_game_post_slice",
    initialState: null,
    reducers: {
        set_create_game_res: (state,action) => {
            console.log("create_game", action?.payload?.data);
            return action.payload?.data
        },
    }
})

export const { set_create_game_res } = Create_game_post_slice.actions;
export default Create_game_post_slice.reducer