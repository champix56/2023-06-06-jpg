/**
 * class modal sans affichage de fermeture
 */
class Modal {
    /**
     * contenu html de la modal de base
     */
    #modalTemplateString = '\
        <div>\
            <h3 id="modal-title"></h3>\
            <div id="modal-content"></div>\
            <div id="modal-button">\
            </div>\
        </div>'
    #refId;
    #modalNode;
    constructor(idModal = "modal") {
        this.#refId = idModal
        this.#modalNode = document.createElement('div')
        this.#modalNode.id = this.#refId
        this.#modalNode.innerHTML = this.#modalTemplateString
    }
    get modalId(){
        return this.#refId
    }
    set modalId(value){
        if(value.length>0){
            this.#refId=value
            this.#modalNode.id=this.#refId
        }
    }
    /**
    * fermeture de la modal
    */
    #removeModal = () => {
        if (undefined !== this.#modalNode) {
            this.#modalNode.remove()
        }
    }
    /**
 * fonction pour afficher une modal
 * @param {string} titre titre du message
 * @param {HTMLElement|string} content contenu html du message
 */
    show(titre, content) {
        if (null !== this.#modalNode) {
            this.#removeModal()
        }
        this.#modalNode.querySelector('#modal-title').innerHTML = titre
        this.#modalNode.querySelector('#modal-content').innerHTML = content
        document.body.appendChild(this.#modalNode)
    }
    /**
     * set buttons content
     * @param {Array<HTMLElement>} btnArray liste des noeuds pour les button avec event prealablement gerés
     */
    setButtons=(btnArray)=>{
        this.#modalNode.querySelector('#modal-button').innerHTML=''
        btnArray.forEach((iterr,i,liste)=>{
             this.#modalNode.querySelector('#modal-button').appendChild(iterr);
             iterr.addEventListener('click',this.#removeModal);
        })
       
    }
}
export class MessageBox extends Modal{
    #okCallback;
    #okButton;
    set okCallback(fn){
        if(typeof fn === 'function'){
            this.#okCallback=fn;
        }
    }
    constructor(okfn){
        super()
        this.okCallback=okfn
        // creation du button
        this.#okButton = document.createElement('button')
        this.#okButton.className="btn btn-primary"
        this.#okButton.innerHTML='OK'
        this.#okButton.type='button'
        // ajout d'event sur le button
        this.#okButton.addEventListener('click',()=>{
        if(typeof this.#okCallback === 'function'){    this.#okCallback()}
        })
        //appel d'une fonction public du parent lié a notre instance étendue
        this.setButtons([this.#okButton]);
    }
    show=(titre,content,okfn)=>{
        this.okCallback=okfn
        super.show(titre,content)
    }
}
export class ConfirmBox extends Modal{
    #okCallback;
    #okButton;
    set okCallback(fn){
        if(typeof fn === 'function'){
            this.#okCallback=fn;
        }
    }
    #cancelCallback;
    #cancelButton;
    set cancelCallback(fn){
        if(typeof fn === 'function'){
            this.#cancelCallback=fn;
        }
    }
    constructor(okfn,cancelfn){
        super()
        this.okCallback=okfn
        // creation du button
        this.#okButton = document.createElement('button')
        this.#okButton.className="btn btn-primary"
        this.#okButton.innerHTML='OK'
        this.#okButton.type='button'
        // ajout d'event sur le button
        this.#okButton.addEventListener('click',()=>{
        if(typeof this.#okCallback === 'function'){    this.#okCallback()}
        })

        this.cancelCallback=cancelfn
        // creation du button
        this.#cancelButton = document.createElement('button')
        this.#cancelButton.className="btn btn-danger"
        this.#cancelButton.innerHTML='Annul'
        this.#cancelButton.type='button'
        // ajout d'event sur le button
        this.#cancelButton.addEventListener('click',()=>{
        if(typeof this.#cancelCallback === 'function'){    this.#cancelCallback()}
        })
        //appel d'une fonction public du parent lié a notre instance étendue
        this.setButtons([this.#okButton,this.#cancelButton])
    }
    show(titre,content,okfn,cancelfn){
        this.okCallback=okfn
        this.cancelCallback=cancelfn
        super.show(titre,content)
    }
}
// console.time('constructMsgBox')
// const msgBox=new MessageBox();
// console.timeEnd('constructMsgBox')