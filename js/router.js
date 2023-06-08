import { listeImgs, listeMemes } from "./coreLib/dataInstance.js"


const routes = [
    {
        name:'editor', 
        pathName: '/meme', 
        viewUrl: '/views/editor.html', 
        pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/ 
    },
    {
        name:'thumb', pathName: '/thumbnail', viewUrl: '/views/thumbnail.html', pathRegex: /^\/thumbnail\/?$/,
        data:{memes:listeMemes, images:listeImgs} 
    },
    {name:'home', pathName: '/', viewUrl: '/views/home.html', pathRegex: /^\/(home)?\/?$/ },
]
export class RouterDOM {
    #currentUrl
    #currentRoute
    currentParams
    set currentRoute(urlStr) {
        window.history.pushState(null, null, urlStr)
        this.manageRoute()
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
        //let templateText=sessionStorage.getItem(this.#currentRoute.name)
        if(undefined!==this.#currentRoute.templateText){
            this.#wrapTemplate(this.#currentRoute)
        }
        else {
            this.#loadTemplate(this.#currentRoute)
        }
    }

    #loadTemplate=(route)=>{
        fetch(route.viewUrl)
            .then(f=>f.text())
            .then(text=>{
                //sessionStorage.setItem(route.name,text);
                this.#currentRoute.templateText=text
                this.#wrapTemplate(this.#currentRoute);
            })
    }
    #wrapTemplate=(route)=>{
        const wrapper=document.querySelector('#main-wrapper')
        wrapper.innerHTML=route.templateText;
    }
}
