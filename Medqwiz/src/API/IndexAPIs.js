import axios from "axios";
import { setCCStep3PostAPI } from "../store/CCStep3PostSlice";
import { setCCStep3GetAPI } from "../store/CCStep3GetSlice";
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
                dispatch(setCCStep3AddAPI(res))
                console.log(res);
            })
            .catch(err => console.log(err))
    }
}