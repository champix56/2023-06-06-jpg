/**
 * Objet pour la gestion de la modal en version es5
 */
function Modal() {
    /**
     * ref principal de la modal
     */
    var mdl = undefined;
    /**
     * initialisation de l'objet modal
     */
    function initVar() {
        document.addEventListener('DOMContentLoaded', (evt) => {
            console.log(evt)
            mdl = document.querySelector('#modal')
            console.log(mdl);
            removeModal();
        });
    }
    /**
     * fonction privée de suppression de la modal
     */
    function removeModal() {
        if (undefined !== modalNode) {
            modalNode.remove()
        }
    }
    function showModal(titre, content) {
        if (null === document.querySelector('#modal')) {
            removeModal();
        }
        mdl.querySelector('#modal-title').innerHTML = titre
        mdl.querySelector('#modal-content').innerHTML = content

        document.body.appendChild(mdl);
    }
    /**
     * exposition de la fonction d'affichage de la modal
     */
    this.show=showModal;
    initVar();
}
var modal=new Modal();
