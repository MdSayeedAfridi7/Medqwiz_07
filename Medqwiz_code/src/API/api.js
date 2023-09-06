import axios from "axios";
import { setLogin } from "../store/LoginSlice";

const LoginAPI = (username, password, deviceInfo, { setloader }) => {
    return (dispatch) => (
        axios.post("https://api-dev.medqwiz.com/v1/pharma/login", {
            username, password, deviceInfo
        })
            .then((res) => {
                setloader(false)
                dispatch(setLogin(res));
                localStorage.setItem("id",res?.data?.data?.id)
                localStorage.setItem("fullName", res?.data?.data?.fullName)
                localStorage.setItem("role", res?.data?.data?.role)
                localStorage.setItem("active", res?.data?.data?.active)
                localStorage.setItem("isotpverified", res?.data?.data?.isotpverified)
                localStorage.setItem("url", res?.data?.data?.dp?.url)
                localStorage.setItem("sidemenu", res?.data?.data?.Preference?.sidemenu)
                localStorage.setItem("darkMode", res?.data?.data?.darkmode)
                localStorage.setItem("en", res?.data?.data?.Preference?.langauage)
                localStorage.setItem("currency", res?.data?.data?.currency)
                localStorage.setItem("token", res?.headers?.at)
            })
            .catch((err) => {
                setloader(false)
                console.log(err);
            })

    )
};

export default LoginAPI;

