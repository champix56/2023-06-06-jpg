



class Modal {
    #refId;
    #modalNode;
    constructor(idModal = "modal") {
        this.#refId = idModal
        document.addEventListener('DOMContentLoaded', (evt) => {
            this.#modalNode = document.querySelector(`#${this.#refId}`)
            this.#removeModal()
        })
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
    document.body.appendChild(this.modalNode)
}
}
const modal=new Modal('modal')
