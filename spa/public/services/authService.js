import { default as FetchHelper } from "../helpers/fetchHelper.js";
import MessageHelper from "../helpers/messageHelper.js";

const AuthService = {
    login: async (login, password) => {
        const response = await FetchHelper.fetchData('login', 'POST', {login, password});
        if (response.status === 200) {
            alert("logged in")
            debugger
            console.log(response)
            document.cookie = response.headers['Set-Cookie']
            window.location.hash = "#/"
            return true
        }
        const json = await response.json()
        MessageHelper.addMessages(json.messages)
        return false
    }
}

export default AuthService