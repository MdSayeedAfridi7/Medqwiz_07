import axios from "axios"
import { setSideMenuList } from "../store/userPageSlice"


const sideMenuListAPI = () => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get("https://api-dev.medqwiz.com/v1/pharma/user/menu",  options )
            .then((res) => {
                dispatch(setSideMenuList(res))
            })
            .catch(err => console.log(err))
    }
}

export default sideMenuListAPI;



