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
    showModal = (titre, content) => {
        if (null !== this.#modalNode) {
            this.#removeModal()
        }
        this.#modalNode.querySelector('#modal-title').innerHTML = titre
        this.#modalNode.querySelector('#modal-content').innerHTML = content
        document.body.appendChild(this.#modalNode)
    }
}
//const modal = new Modal('modal')
