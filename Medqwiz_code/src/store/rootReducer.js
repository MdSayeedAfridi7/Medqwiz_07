import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice"
import userPageSlice from "./userPageSlice";
import LogoutSlice from './LogoutSlice'
import ActiveCampaignSlice from "./ActiveCampaignSlice"
import TypesOfCampTempSlices from "./TypesOfCampTempSlices"
import CCStep1Slice from "./CCStep1Slice"
import CCStep2Slice from "./CCStep2Slice" 
import CCStep3PostSlice from "./CCStep3PostSlice" 
import CCStep3GetSlice from "./CCStep3GetSlice" 
import CCStepT_F_Slice from "./CCStepT_F_Slice"
import CCStep3AddSlice from "./CCStep3AddSlice"
import Types_slice from "./GameDetailSlice.js/Types_slice"
import Create_game_post_slice from "./GameDetailSlice.js/Create_game_post_slice"
import game_questions_slice from "./GameDetailSlice.js/game_questions_slice"




const rootReducer = combineReducers({
    loginSlice,
    userPageSlice,
    LogoutSlice,
    ActiveCampaignSlice,
    TypesOfCampTempSlices,
    CCStep1Slice,
    CCStep2Slice,
    CCStep3PostSlice,
    CCStep3GetSlice,
    CCStepT_F_Slice,
    CCStep3AddSlice,
    Types_slice,
    Create_game_post_slice,
    game_questions_slice

})


export default rootReducer;