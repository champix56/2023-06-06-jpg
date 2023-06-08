
const routes = {
    thumbnail: '/thumbnail',
    home: '/'
}

export class RouterDOM {
    #currentUrl
    set currentRoute(urlStr) { 
        window.history.pushState(null,null,urlStr)
    }
    constructor() {
        this.#currentUrl=window.location.pathname
    }
    manageRoute=()=>{

    }
}
