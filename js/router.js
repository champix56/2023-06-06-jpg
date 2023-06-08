
const routes = [
    { pathName: '/meme', viewUrl: '/views/editor.html', pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/ },
    { pathName: '/thumbnail', viewUrl: '/views/thumbnail.html', pathRegex: /^\/thumbnail\/?$/ },
    { pathName: '/', viewUrl: '/views/home.html', pathRegex: /^\/(home)?\/?$/ },
]
export class RouterDOM {
    #currentUrl
    #currentRoute
    currentParams
    set currentRoute(urlStr) {
        window.history.pushState(null, null, urlStr)
    }
    constructor() {
        this.#currentUrl = window.location.pathname
    }
    manageRoute = () => {
        this.#currentUrl=window.location.pathname
        this.#currentRoute=routes.find(route => {
            const m = route.pathRegex.exec(this.#currentUrl)
            if (null === m) return false
            else {
                this.currentParams = m.groups
                return true
            }
        })
    }
}
