import axios from "axios"
import { setTypesOfCampTemp } from "../store/TypesOfCampTempSlices"

const CampTemTypAPI = () => {
    return (dispatch) => {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        axios.get("https://api-dev.medqwiz.com/v1/camp/list/archived", options)
            .then((res) => {
                console.log("types_drop", res)
                dispatch(setTypesOfCampTemp(res))
            })
            .catch(err => console.log(err))

    }
}

export default CampTemTypAPI