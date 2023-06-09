import { listeImgs, listeMemes } from "../coreLib/dataInstance.js"

export class EditorController {
    wrapper
    listesMemes
    listeImages
    #currentMeme
    #currentImage
    #params
    set params(parametres) {
        this.#params = parametres
    }
    constructor(memes = listeMemes, images = listeImgs) {
        this.listeImages = images
        this.listesMemes = memes
    }
    refresh() {

    }
}