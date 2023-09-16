import { createSlice } from "@reduxjs/toolkit";

const game_questions_slice = createSlice({
    name: "game_questions_slice",
    initialState: [],
    reducers: {
        set_game_questions: (state, action) => {
            console.log("game_questions_slice", action?.payload?.data);
            return action?.payload?.data
        },
        add_game_questions: (state, action) => {
            console.log("add_game_slice", action?.payload?.data);
            return {
                ...state, question: state?.question?.concat(action?.payload?.data?.question)
            }
        },
        set_game_context_details: (state, action) => {
            console.log("set_game_context_details", action?.payload);

            return {
                ...state, question: state?.question?.map((question) => {
                    console.log("questionIds_slice", question?.id, action?.payload?.id);
                    if (question?.id === action?.payload?.id) {
                        return action?.payload
                    } else {
                        return (
                            question
                        )
                    }
                })
            }
        },

        deleteQuestionCard: (state, action) => {
            return {
                ...state, question: state?.question?.filter((questionList) => questionList?.id !== action?.payload?.questionId)
            }
        },

        // deleteGame: (state, action) => {
        //     return null
        // }

    }
})


export const { set_game_questions, add_game_questions, set_game_context_details, deleteQuestionCard, deleteGame } = game_questions_slice.actions;
export default game_questions_slice.reducer