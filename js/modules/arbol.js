import Nodo from "./nodo.js";
export default class Arbol{
    constructor() {
        this.raiz = null;
    }
    //Para insertar un nodo en el árbol
    agregar(nodo) {
        if (this.raiz == null) {
            this.raiz = nodo;
        } else {
            this.agregarNodo(this.raiz, nodo);
        }
    }
    agregarNodo(nodoActual, nodo) {
        if (nodo.numero < nodoActual.numero) {
            console.log(`El nodo ${nodo.numero} es menor que el nodo ${nodoActual.numero}`);
            if (nodoActual.left == null) {
                nodoActual.left = nodo;
                console.log(`Nodo ${nodo.numero} agregado a la izquierda de ${nodoActual.numero}`);
            } else {
                this.agregarNodo(nodoActual.left, nodo);
            }
        } else {
            console.log(`El nodo ${nodo.numero} es mayor que el nodo ${nodoActual.numero}`);
            if (nodoActual.right == null) {
                nodoActual.right = nodo;
                console.log(`Nodo ${nodo.numero} agregado a la derecha de ${nodoActual.numero}`);
            } else {
                console.log('Recursiva', nodo.numero,',', nodoActual.right.numero);
                this.agregarNodo(nodoActual.right, nodo);
            }
        }
    }
}