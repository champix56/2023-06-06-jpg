function Modal() {
    var mdl = undefined;
    function initVar() {
        document.addEventListener('DOMContentLoaded', (evt) => {
            console.log(evt)
            mdl = document.querySelector('#modal')
            console.log(mdl);
            removeModal();
        });
    }
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
    this.show=showModal;
    initVar();
}
var modal=new Modal();
