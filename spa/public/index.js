import {default as UrlHelper} from "./helpers/urlHelper.js";
import {default as Login} from "./views/login.js";
import {default as MainPage} from "./views/mainPage.js";
import Register from "./views/register.js";
import History from "./views/history.js";
import Search from "./views/search.js";
import Stock from "./views/stock.js";
import BaseService from "./services/baseService.js";

const pages = {
    "/": MainPage,
    "/login": Login,
    "/register": Register,
    "/history": History,
    "/stock/search": Search,
    "/stock/:id": Stock
};

const router = async () => {
    const content = document.querySelector("#site-content");

    const isAuthorized = document.cookie.includes("userId");
    const routeParts = UrlHelper.getRouteParts();
    let url
    if (routeParts[0] === "stock") {
        if (routeParts[1] === "search") {
            url = "/stock/search"
        } else {
            url = "/stock/:id"
        }
    } else {
        url = "/" + routeParts[0]
    }
    let page = pages[url];

    // if (isAuthorized || !UrlHelper.isRouteProtected) {
    //   alert("authorized");
    // } else {
    //   page = pages["/login"];
    //   window.location.hash = "#/login";
    // }

    switch (page) {
        case MainPage: {
            const results = await BaseService.info()
            if (results) {
                content.innerHTML = await page.render(results.total, results.transactions)
            }
            break;
        }
        case History: {
            const results = await BaseService.history()
            if (results) {
                content.innerHTML = await page.render(results)
            }
            break;
        }

        default: {
            content.innerHTML = await page.render();
            await page.afterRender();
            break;
        }
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
