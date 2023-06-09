import { ConfirmBox } from "../composantsWeb/modal.js"
import { listeImgs, listeMemes } from "../coreLib/dataInstance.js"
import { Meme } from "../coreLib/meme.js"
import router from "../coreLib/router.js"
let svgImageNode = undefined
export class EditorController {
    wrapper
    listesMemes
    listeImages
    #currentMeme
    #currentImage
    #params
    set params(parametres) {
        if (undefined !== parametres.id) {
            this.#currentMeme = this.listesMemes.find(m => {
                // console.log('valeurs :',m.id, '-->', parametres.id)
                return m.id === Number(parametres.id)
            })
            // console.log('valeur tourvée', this.#currentMeme)
            if (undefined === this.#currentMeme) {
                return router.currentRoute = '/404'
            }
            else {
                this.#currentImage = this.listeImages.find(i => i.id === this.#currentMeme.imageId)
            }
        } else {
            this.#currentMeme = new Meme()
            this.#currentImage = undefined
        }

        this.#params = parametres
    }
    constructor(memes = listeMemes, images = listeImgs) {
        this.listeImages = images
        this.listesMemes = memes
    }
    initView() {
        const form = this.wrapper.querySelector('form')
        form.addEventListener('submit', evt => {
            evt.preventDefault();
            (new ConfirmBox(() => {
                this.#currentMeme.save((obj)=>{
                    //si l'objet existe dans la liste je le remplace 
                    const position=this.listesMemes.findIndex(m=>m.id===obj.id)
                    if(position>=0){
                        this.listesMemes[position]=obj
                    }
                    //sinon je l'ajoute a la liste avec son id retourner par le rest
                    else{
                        this.listesMemes.push(obj)
                    }
                    console.log(this.listesMemes);
                    router.currentRoute='/thumbnail'
                });
            })).show('Enregistrer', 'souhaitez vous enregistrer ce meme?')
        })




        form['image'].addEventListener('change', (evt) => {
            this.#currentMeme.imageId = Number(evt.target.value)
            this.#currentImage = this.listeImages.find(i => i.id === this.#currentMeme.imageId)
            this.refreshSvg()
        })
        form['titre'].addEventListener('input', evt => {
            this.#currentMeme.titre = evt.target.value
            //this.refreshSvg()
        })
        form['text'].addEventListener('input', evt => {
            this.#currentMeme.text = evt.target.value
            this.refreshSvg()
        })
        form['color'].addEventListener('input', evt => {
            this.#currentMeme.color = evt.target.value
            this.refreshSvg()
        })
        form['x'].addEventListener('input', evt => {
            this.#currentMeme.x = Number(evt.target.value)
            this.refreshSvg()
        })
        form['y'].addEventListener('input', evt => {
            this.#currentMeme.y = Number(evt.target.value)
            this.refreshSvg()
        })
        form['fontWeight'].addEventListener('input', evt => {
            this.#currentMeme.fontWeight = evt.target.value
            this.refreshSvg()
        })
        form['fontSize'].addEventListener('input', evt => {
            this.#currentMeme.fontSize = Number(evt.target.value)
            this.refreshSvg()
        })
        form['underline'].addEventListener('input', evt => {
            this.#currentMeme.underline = evt.target.checked
            this.refreshSvg()
        })
        form['italic'].addEventListener('input', evt => {
            this.#currentMeme.italic = evt.target.checked
            this.refreshSvg()
        })
        form['frameSizeX'].addEventListener('input', evt => {
            this.#currentMeme.frameSizeX = Number(evt.target.value)
            this.refreshSvg()
        })
        form['frameSizeY'].addEventListener('input', evt => {
            this.#currentMeme.frameSizeY = Number(evt.target.value)
            this.refreshSvg()
        })
        this.refresh()
    }
    refresh() {
        if (undefined === this.wrapper) {
            console.log('%c%s', 'font-weight:900;font-size:32pt;color:tomato', 'EditorController wrapper not set')
            return
        }
        const form = this.wrapper.querySelector('form')
        const imageSelect = form['image']
        const nullOpt = imageSelect.querySelector('option[value="-1"]')
        imageSelect.innerHTML = ''
        imageSelect.appendChild(nullOpt);
        this.listeImages.map(i => {
            // const opt= document.createElement('option')
            const opt = nullOpt.cloneNode(true);
            opt.innerHTML = i.titre
            opt.value = i.id
            imageSelect.appendChild(opt);
        })
        imageSelect.value = this.#currentMeme.imageId

        form['titre'].value = this.#currentMeme.titre

        form['text'].value = this.#currentMeme.text

        form['x'].value = this.#currentMeme.x

        form['y'].value = this.#currentMeme.y

        form['color'].value = this.#currentMeme.color

        form['fontSize'].value = this.#currentMeme.fontSize

        form['fontWeight'].value = this.#currentMeme.fontWeight

        form['underline'].checked = this.#currentMeme.underline

        form['italic'].checked = this.#currentMeme.italic

        form['frameSizeX'].value = this.#currentMeme.frameSizeX

        form['frameSizeY'].value = this.#currentMeme.frameSizeY

        this.refreshSvg();
    }
    refreshSvg() {
        console.log(this.#currentMeme);
        const svgNode = this.wrapper.querySelector('svg')
        const textNode = svgNode.querySelector('text')
        if (undefined === svgImageNode) {
            svgImageNode = svgNode.querySelector('image')
        }
        svgImageNode.remove()
        if (undefined !== this.#currentImage) {
            svgNode.setAttribute('viewBox', `${-this.#currentMeme.frameSizeX} ${-this.#currentMeme.frameSizeY} ${this.#currentImage.w + (this.#currentMeme.frameSizeX * 2)} ${this.#currentImage.h + (this.#currentMeme.frameSizeY * 2)}`)
            svgImageNode.setAttribute('xlink:href', this.#currentImage.url)
            svgNode.insertBefore(svgImageNode, textNode)
        }
        else {
            svgNode.setAttribute('viewBox', `${-this.#currentMeme.frameSizeX} ${-this.#currentMeme.frameSizeY} ${1000 + (this.#currentMeme.frameSizeX * 2)} ${1000 + (this.#currentMeme.frameSizeY * 2)}`)
        }
        textNode.innerHTML = this.#currentMeme.text
        textNode.setAttribute('x', this.#currentMeme.x)
        textNode.setAttribute('y', this.#currentMeme.y)
        textNode.style.fontSize = this.#currentMeme.fontSize
        textNode.style.fontWeight = this.#currentMeme.fontWeight
        textNode.style.fill = this.#currentMeme.color
        textNode.style.textDecoration = this.#currentMeme.underline ? 'underline' : 'none'
        textNode.style.fontStyle = this.#currentMeme.italic ? 'italic' : 'normal'

    }

}