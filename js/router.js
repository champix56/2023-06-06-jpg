
const routes = [
    { pathName: '/meme', viewUrl: '/views/editor.html', pathRegex: /\/meme\/*/ },
    { pathName: '/thumbnail', viewUrl: '/views/thumbnail.html', pathRegex: /\/thumbnail/ },
    { pathName: '/', viewUrl: '/views/home.html', pathRegex: /\/*/ },
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

    }
}
