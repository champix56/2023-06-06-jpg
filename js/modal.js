let modalNode = undefined;
document.addEventListener('DOMContentLoaded', (evt) => {
    console.log(evt)
    modalNode = document.querySelector('#modal')
    console.log(modalNode);
    removeModal();
});
/**
 * fermeture de la modal
 */
const removeModal = () => {
    if (undefined !== modalNode) {
        modalNode.remove()
    }
}
/**
 * fonction pour afficher une modal
 * @param {string} titre titre du message
 * @param {HTMLElement|string} content contenu html du message
 */
const showModal = (titre, content) => {
    if (null === document.querySelector('#modal')) {
        removeModal();
    }
    modalNode.querySelector('#modal-title').innerHTML = titre
    modalNode.querySelector('#modal-content').innerHTML = content

    document.body.appendChild(modalNode);
}
