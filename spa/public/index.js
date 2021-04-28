import { default as UrlHelper } from "./helpers/urlHelper.js";
import { default as Login } from "./views/login.js";
import { default as MainPage } from "./views/mainPage.js";

const pages = {
  "/": MainPage,
  "/login": Login,
};

const router = async () => {
  const content = document.querySelector("#site-content");

  const isAuthorized = false;
  const routeParts = UrlHelper.getRouteParts();
  let page = pages["/"];

  if (isAuthorized || !UrlHelper.isRouteProtected) {
    alert("authorized");
  } else {
    page = pages["/login"];
    window.location.hash = "#/login";
  }

  switch (page) {
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
