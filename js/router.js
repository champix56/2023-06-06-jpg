
const routes = [
    { pathName: '/meme', viewUrl: '/views/editor.html', pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/ },
    { pathName: '/thumbnail', viewUrl: '/views/thumbnail.html', pathRegex: /^\/thumbnail\/?$/ },
    { pathName: '/', viewUrl: '/views/home.html', pathRegex: /^\/(home)?\/?$/ },
]

export class RouterDOM {
    #currentUrl
    set currentRoute(urlStr) {
        window.history.pushState(null, null, urlStr)
    }
    constructor() {
        this.#currentUrl = window.location.pathname
    }
    manageRoute = () => {
        let routeposition=0;
        let routeFound=false;
        do{

        }while(routeposition++<routes.length && !routeFound)
    }
}
