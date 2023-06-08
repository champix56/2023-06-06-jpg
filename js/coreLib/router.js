import { routes } from "../config/routesConfig.js";


export class RouterDOM {
  static get viewWrapper() {
    return document.querySelector("#main-wrapper");
  }
  #currentUrl;
  #currentRoute;
  currentParams;
  set currentRoute(urlStr) {
    window.history.pushState(null, null, urlStr);
    this.manageRoute();
  }
  constructor() {
    this.#currentUrl = window.location.pathname;
  }
  manageRoute = () => {
    this.#currentUrl = window.location.pathname;
    this.#currentRoute = routes.find((route) => {
      const m = route.pathRegex.exec(this.#currentUrl);
      if (null === m) return false;
      else {
        this.currentParams = m.groups;
        return true;
      }
    });
    if (undefined === this.#currentRoute) {
      //preservation de la route
      //this.#currentRoute=routes.find(e=>e.name==='404')
      //sans preservation de la route avec redirection
      return (this.currentRoute = "/404");
    }
    if (undefined !== this.#currentRoute.templateText) {
      this.#wrapTemplate(this.#currentRoute);
    } else {
      this.#loadTemplate(this.#currentRoute);
    }
  };

  #loadTemplate = (route) => {
    fetch(route.viewUrl)
      .then((f) => f.text())
      .then((text) => {
        //sessionStorage.setItem(route.name,text);
        this.#currentRoute.templateText = text;
        this.#wrapTemplate(this.#currentRoute);
      });
  };
  #wrapTemplate = () => {
    RouterDOM.viewWrapper.innerHTML = this.#currentRoute.templateText
    if (undefined !== this.#currentRoute.controller) {
      this.#currentRoute.controller.wrapper=RouterDOM.viewWrapper
      this.refresh()
    }
  };
  refresh = () => {
    if (undefined !== this.#currentRoute.controller) {
      this.#currentRoute.controller.refresh()
    }
  };
}
export default new RouterDOM();