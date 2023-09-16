import axios from "axios";
import { setCCStep3PostAPI } from "../store/CCStep3PostSlice";
import { AddCCStep3CardDetails, deleteCCStep3Card, deleteCCStep3CardDetails, deleteCCStep3CardImage, setCCStep3GetAPI, setCCStep3GetAPIReset, uploadCCStep3CardDetails } from "../store/CCStep3GetSlice";
import { setCCStepsTF } from "../store/CCStepT_F_Slice";
import { setCCStep3AddAPI } from "../store/CCStep3AddSlice";
import { get_game_types } from "../store/GameDetailSlice.js/Types_slice";
import { deleteFullGame, set_create_game_res } from "../store/GameDetailSlice.js/Create_game_post_slice";
import { add_game_questions, deleteGame, deleteQuestionCard, set_game_questions } from "../store/GameDetailSlice.js/game_questions_slice";



export const CCStep3PostAPI = (apiData) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        const formData = new FormData();
        for (const key in apiData) {
            formData.append(key, apiData[key]);
        }
        console.log('formData', formData);

        axios.post("https://api-dev.medqwiz.com/v1/camp/update", formData, options)
            .then((res) => {
                dispatch(setCCStep3PostAPI(res))
                console.log(res);
            })
            .catch(err => console.log(err))
    }
}


export const CCStepsTrueFalseAPI = (steps, CCStep2Data) => {
    console.log(steps)
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        console.log("T/F", steps);
        axios.post(`https://api-dev.medqwiz.com/v1/camp/step/update?campId=${CCStep2Data.id}`, steps, options)
            .then((res) => {
                console.log(res);
                dispatch(setCCStepsTF(res))
            })
            .catch(err => console.log(err))
    }
}





export const CCStep3GetAPI = (params) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log(params);

        axios.get(`https://api-dev.medqwiz.com/v1/camp/card/get?campId=${params}`, options)
            .then((res) => {
                dispatch(setCCStep3GetAPI(res))
            })
            .catch(err => console.log(err))
    }
}

// card details add api

export const CCStep3AddAPI = (addStep3Payload, { setCardState }, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        // console.log(payload);

        axios.post("https://api-dev.medqwiz.com/v1/camp/card/add", addStep3Payload, options)
            .then((res) => {
                // console.log("state", res?.data?.map((e) => {
                //     return (e?.id)
                // }));
                console.log("state", res?.data[0]);
                dispatch(AddCCStep3CardDetails(res))
                setCardState(res?.data[0])
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}



export const CCStep3DeleteAPI = (deletePayload, id, cardState, { setCardState }, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        setLoader(true)
        // console.log(payload);
        axios.post("https://api-dev.medqwiz.com/v1/camp/card/image/delete", deletePayload, options)
            .then((res) => {
                console.log("delete_api", { res, deletePayload, id });
                dispatch(deleteCCStep3CardImage({ res, deletePayload, id }))
                setCardState({ ...cardState, media: cardState?.media?.filter((medialist) => medialist?.id !== deletePayload?.id) })
                console.log(res, deletePayload);
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}



export const CCStep3DeleteCardAPI = (deleteCardPayload, cardId, { setLoader }, { setCardState }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        // setLoader(true)
        // console.log(payload);
        axios.put("https://api-dev.medqwiz.com/v1/camp/card/delete", deleteCardPayload, options)
            .then((res) => {
                console.log(res);
                // dispatch(setCCStep3GetAPIReset())
                dispatch(deleteCCStep3Card({ res, deleteCardPayload, cardId }))
                setCardState("")
            })
            .catch(err => console.log(err))
        setLoader(false)
    }
}

export const CCStep3UploadAPI = (formData, id, cardState, { setCardState }, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        // setLoader(true)

        console.log(formData);
        axios.post("https://api-dev.medqwiz.com/v1/camp/card/image/upload", formData, options)
            .then((res) => {
                console.log({ res });
                console.log("upload_dispatch", { res, formData, id });
                dispatch(uploadCCStep3CardDetails({ res, formData, id }))
                setCardState({ ...cardState, media: cardState?.media?.concat(res?.data) })
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}


export const CCPUT_UpdateAPI = (CCStep3CardsData, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        axios.put("https://api-dev.medqwiz.com/v1/camp/card/update", CCStep3CardsData, options)
            .then((res) => {
                console.log(res);

            })
            .catch(err => console.log(err))
        setLoader(false)
    }
}



export const game_details_types_api = () => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        // console.log(params); 

        axios.get(`https://api-dev.medqwiz.com/v1/camp/game/types`, options)
            .then((res) => {
                console.log(res);
                dispatch(get_game_types(res))
            })
            .catch(err => console.log(err))
    }
}

export const game_create_api = (createPayload) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.post("https://api-dev.medqwiz.com/v1/camp/game/create", createPayload, options)
            .then((res) => {
                console.log("create_game", res);
                dispatch(set_create_game_res(res))
                // setLoader(false)

            })
            .catch(err => console.log(err))
    }
}


export const game_questions_api = (id) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.get(`https://api-dev.medqwiz.com/v1/camp/game/questions?campId=${id}`, options)
            .then((res) => {
                console.log("game_questions_api_res", res);
                dispatch(set_game_questions(res))
                // setLoader(false)

            })
            .catch(err => console.log(err))
    }
}



// https://api-dev.medqwiz.com/v1/camp/game/create/question?options=4

export const add_game_questions_api = (questionPayload, questionOptions, { setQuestionCard }, {setLoader}) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.post(`https://api-dev.medqwiz.com/v1/camp/game/create/question?options=${questionOptions}`, questionPayload, options)
            .then((res) => {
                console.log("add_question_api_res", res);
                dispatch(add_game_questions(res))
                setQuestionCard(res?.data?.question[0])
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}


// https://api-dev.medqwiz.com/v1/camp/game/delete/question

export const delete_game_question_api = (deleteQuestionPayload, questionId, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.post(`https://api-dev.medqwiz.com/v1/camp/game/delete/question`, deleteQuestionPayload, options)
            .then((res) => {
                console.log("###########", res, deleteQuestionPayload, questionId);
                dispatch(deleteQuestionCard({ res, questionId }))
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}

// https://api-dev.medqwiz.com/v1/camp/game/delete

export const delete_game_api = (deleteGamePayload, {setLoader}) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.post(`https://api-dev.medqwiz.com/v1/camp/game/delete`, deleteGamePayload, options)
            .then((res) => {
                console.log("!!!!", res);
                dispatch(deleteFullGame(res))
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}