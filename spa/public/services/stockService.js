import { default as FetchHelper } from "../helpers/fetchHelper.js";
import MessageHelper from "../helpers/messageHelper.js";

const StockService = {
    stock: async (symbol) => {
        const url = `stock/${symbol}`
        const response = await FetchHelper.fetchData(url, 'GET')
        if (response.status === 200) {
            window.location.hash = "#/" + url
            return await response.json()
        }
    }
}

export default StockService