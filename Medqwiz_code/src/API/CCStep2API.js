import axios from "axios";
import { getCCStep2API } from "../store/CCStep2Slice";

// const CCStep2API = (state, { setloader }) => {
const CCStep2API = (id) => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log(id);
        axios.get(`https://api-dev.medqwiz.com/v1/camp/get?campId=${id}`, options)
            .then((res) => {
                dispatch(getCCStep2API(res))
            })
            .catch(err => console.log(err))
    }
}

export default CCStep2API;


