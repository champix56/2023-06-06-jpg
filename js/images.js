import { ADR_REST } from "./config";
export class Images extends Array {
    static ressourceName = '/images'
/**
 * fonction de chargement async Promise
 * @returns {Promise} promise d'appel du fetch
 */
    load = () => {
        return fetch(`${ADR_REST}${Images.ressourceName}`)
            .then(f => f.json())
            .then(arr => {
                arr.map(element => {
                    this.push(element)
                })
                return arr
            })
    }
}