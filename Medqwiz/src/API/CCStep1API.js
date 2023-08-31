import axios from "axios";
import { setCCStep1API } from "../store/CCStep1Slice";

// const CCStep1API = (state, { setloader }) => {
const CCStep1API = (state) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log("state", state);
        axios.post(`https://api-dev.medqwiz.com/v1/camp/add?campId=${state?.campId}`, state, options)
            .then((res) => {
                dispatch(setCCStep1API(res))
            })
            .catch(err => console.log(err))
    }
}

export default CCStep1API;


