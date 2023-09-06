import axios from "axios";
import { setActiveCampaign } from "../store/ActiveCampaignSlice";


const ActiveCampaignAPI = (pageData, { setTotalRows }, selectedFilters, searchCamapaign) => {

    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log("my page", pageData);
        axios.get(`https://api-dev.medqwiz.com/v1/camp/list?status=${selectedFilters}&page=${pageData?.pageNo}&limit=${pageData?.limit}&search=${searchCamapaign}`, options)
            .then((res) => {
                // console.log("api", res);
                
                dispatch(setActiveCampaign(res?.data?.campaign))
                setTotalRows(res?.data?.total)
                
            })
            .catch(err => console.log(err))
    }
}

export default ActiveCampaignAPI;