import axios from "axios";
import { setActiveCampaign } from "../store/ActiveCampaignSlice";


const ActiveCampaignAPI = () => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log("activeapiOptions");
        axios.get("https://api-dev.medqwiz.com/v1/camp/list?status=Live&page=1&limit=7&search=", options)
            .then((res) => {
                // console.log("api", res);
                dispatch(setActiveCampaign(res?.data?.campaign))
            })
            .catch(err => console.log(err))
    }
}

export default ActiveCampaignAPI;