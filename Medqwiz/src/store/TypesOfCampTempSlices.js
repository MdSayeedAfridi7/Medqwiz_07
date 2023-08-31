import { createSlice } from "@reduxjs/toolkit";

const TypesOfCampTempSlices = createSlice({
    name: "Types_of_camp_template",
    initialState: null,
    reducers: {
        setTypesOfCampTemp: (state, action) => {
            return action?.payload?.data
        },
    }
})

export const {setTypesOfCampTemp} = TypesOfCampTempSlices.actions
export default TypesOfCampTempSlices.reducer