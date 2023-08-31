import axios from "axios"
import { setLogoutAPI } from "../store/LogoutSlice"

const LogoutAPI = () => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log("options", options);
        axios.get("https://api-dev.medqwiz.com/v1/pharma/user/session/close", options)
        .then((res)=>{
            dispatch(setLogoutAPI(res))
        })
        .catch(err => console.log(err))
    }
}

export default LogoutAPI;