import axios from "axios";
import { setCCStep3PostAPI } from "../store/CCStep3PostSlice";
import { AddCCStep3CardDetails, deleteCCStep3CardDetails, setCCStep3GetAPI, uploadCCStep3CardDetails } from "../store/CCStep3GetSlice";
import { setCCStepsTF } from "../store/CCStepT_F_Slice";
import { setCCStep3AddAPI } from "../store/CCStep3AddSlice";



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

        // axios.get(`https://api-dev.medqwiz.com/v1/camp/get?campId=${params}`, options)
        axios.get(`https://api-dev.medqwiz.com/v1/camp/card/get?campId=${params}`, options)
            .then((res) => {
                dispatch(setCCStep3GetAPI(res))
            })
            .catch(err => console.log(err))
    }
}


export const CCStep3AddAPI = (addStep3Payload) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        // console.log(payload);

        axios.post("https://api-dev.medqwiz.com/v1/camp/card/add", addStep3Payload, options)
            .then((res) => {
                dispatch(AddCCStep3CardDetails(res))
                console.log(res);
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
                dispatch(deleteCCStep3CardDetails({ res, deletePayload, id }))
                setCardState({ ...cardState, media: cardState?.media?.filter((medialist) => medialist?.id !== deletePayload?.id) })
                console.log(res, deletePayload);
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
}
export const CCStep3UploadAPI = (formData, id, cardState, { setCardState }, { setLoader }) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        setLoader(true)

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

