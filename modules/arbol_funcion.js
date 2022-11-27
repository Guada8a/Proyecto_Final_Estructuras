class Nodo {
    constructor(valor) {
        this.hijoizq = null;
        this.valor = valor;
        this.hijoder = null;
        this.siguiente = null;
        this.anterior = null;
        this.indice = null;
    }
}
class ArbolBinario{
    constructor() {
        this.root = null;
        this.primero = null;
        this.respre = '';
        this.respro = '';
    }
    agregar(expresion) {
        let expresion_d = this.agregarNodo(expresion);
        for (let i = 0; i < expresion_d.length; i++) {
            if (this.primero == null) {
                this.primero = expresion_d[i];
                this.primero.siguiente = expresion_d[i + 1];

            } else {
                expresion_d[i].siguiente = expresion_d[i + 1];
                expresion_d[i].anterior = expresion_d[i - 1];
            }

        }
        return expresion_d;
    }

    agregarNodo(expresion) {
        let arreglo = [];
        for (let i = 0; i < expresion.length; i++) {
            let nodo = new Nodo(expresion[i]);
            nodo.indice = i;
            arreglo.push(nodo);
        }
        return arreglo;
    }

    expresion(expresion) {
        let aux = this.primero;
        let root = null;
        while (aux != null) {

            if ((aux.valor === '*' || aux.valor === '/')) {
                aux.hijoder = aux.siguiente;
                aux.hijoizq = aux.anterior;

                if (aux.siguiente.siguiente == undefined && aux.anterior.anterior == undefined) {
                    aux.siguiente = null;
                    aux.anterior = null;
                } else if (aux.siguiente.siguiente == undefined) {
                    aux.siguiente = null;
                    aux.anterior = aux.anterior.anterior;
                    aux.anterior.siguiente = aux;
                } else if (aux.anterior.anterior == undefined) {
                    aux.anterior = null;
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.siguiente.anterior = aux;
                } else {
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.anterior = aux.anterior.anterior;
                    aux.siguiente.anterior = aux;
                    aux.anterior.siguiente = aux;
                }
                root = aux;
            }
            aux = aux.siguiente;
        }
        this.root = root;

        aux = this.primero;
        while (aux != null) {

            if ((aux.valor === '-' || aux.valor === '+')) {
                aux.hijoder = aux.siguiente;
                aux.hijoizq = aux.anterior;
                if (aux.siguiente.siguiente == undefined && aux.anterior.anterior == undefined) {
                    aux.siguiente = null;
                    aux.anterior = null;

                } else if (aux.siguiente.siguiente == undefined) {
                    aux.siguiente = null;
                    aux.anterior = aux.anterior.anterior;
                    aux.anterior.siguiente = aux;
                } else if (aux.anterior.anterior == undefined) {
                    aux.anterior = null;
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.siguiente.anterior = aux;
                } else {
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.anterior = aux.anterior.anterior;
                    aux.siguiente.anterior = aux;
                    aux.anterior.siguiente = aux;
                }
                root = aux;
            }
            aux = aux.siguiente;

        }
        this.root = root
        return [this.postorder(), this.preorder()];
    }

    preorder() {
        this.respre = '';
        if (this.root == null) {
            return false;
        } else {
            this._preOrder(this.root);
        }
        return this.respre;
    }

    _preOrder(nodox) {
        this.respre += nodox.valor;
        if (nodox.hijoizq != null) {
            this._preOrder(nodox.hijoizq);
        }
        if (nodox.hijoder != null) {
            this._preOrder(nodox.hijoder);
        }

    }

    postorder() {
        this.respro = '';
        if (this.root == null) {
            return false;
        } else {
            this._postOrder(this.root);
        }
        return this.respro;
    }

    _postOrder(nodox) {

        if (nodox.hijoizq != null) {
            this._postOrder(nodox.hijoizq);
        }
        if (nodox.hijoder != null) {
            this._postOrder(nodox.hijoder);
        }
        this.respro += nodox.valor;

    }

    resPreOrder(expresion) {
        let pila = [];

        for (let i = expresion.length - 1; i >= 0; i--) {
            if (expresion[i] == '+' || expresion[i] == '-' || expresion[i] == '*' || expresion[i] == '/') {
                let der = Number(pila.pop());
                let izq = Number(pila.pop());
                pila.push(this.calcularExp(expresion[i], der, izq));
            } else {
                pila.push(expresion[i]);
            }
        }
        return pila.pop();
    }
    resPostOrder(expresion) {
        let pila = [];
        for (let i = 0; i < expresion.length; i++) {
            if (expresion[i] == '+' || expresion[i] == '-' || expresion[i] == '*' || expresion[i] == '/') {
                let der = Number(pila.pop());
                let izq = Number(pila.pop());
                pila.push(this.calcularExp(expresion[i], izq, der));
            } else {
                pila.push(expresion[i]);
            }
        }
        return pila.pop()

    }

    calcularExp(op, l, r) {
        let resultado;
        switch (op) {
            case '+':
                resultado = l + r;
                break;
            case '-':
                resultado = l - r;
                break;
            case '*':
                resultado = l * r;
                break;
            case '/':
                resultado = l / r;
                break;
        }
        return resultado;
    }
    crearCanvas() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 17px Calibri";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerx = canvas.width / 2;
        this.dibujarArbol(ctx, this.root, centerx, 12, 170, 50);
    }
    dibujarArbol(ctx, tree, x, y, ancho, alto) {
        if (!tree) return;
        else {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, (Math.PI / 180) * 360);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FF5733";
            ctx.stroke();
        }

        if (tree.hijoizq != null) {
            ctx.beginPath();
            ctx.moveTo(x, y + 10);
            ctx.lineTo(x, y + 20);
            ctx.lineTo(x - ancho, y + 20);
            ctx.lineTo(x - ancho, (y - 10) + (alto - 10));
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        if (tree.hijoder != null) {
            ctx.beginPath();
            ctx.moveTo(x, y + 10);
            ctx.lineTo(x, y + 20);
            ctx.lineTo(x + ancho, y + 20);
            ctx.lineTo(x + ancho, (y - 10) + (alto - 10));
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        if (tree.valor == "*")
            ctx.fillText(tree.valor, x, y + 5);
        else
            ctx.fillText(tree.valor, x, y);

        this.dibujarArbol(ctx, tree.hijoizq, x - ancho, y + (alto - 10), ancho / 2, alto);
        this.dibujarArbol(ctx, tree.hijoder, x + ancho, y + (alto - 10), ancho / 2, alto);
    }
}

//Relacion html with javascript
document.getElementById('calcular').addEventListener('click', startTree);

let inputExpresion = document.getElementById('txtE');
inputExpresion.addEventListener('keyup', startTree);
inputExpresion.addEventListener('keypress', startTree);
inputExpresion.addEventListener('onchange', startTree);

function startTree() {
    console.clear();
    let Arbol = new ArbolBinario();

    let post = '';
    let pre = '';

    let expresion = document.getElementById('txtE').value;
    console.log(Arbol.agregar(expresion));
    
    [post, pre] = Arbol.expresion(expresion);

    console.log("Arbol:");
    console.log(Arbol.root);

    var e1 = document.getElementById('preorden');
    var re1 = document.getElementById('resultado-preorden');
    var e3 = document.getElementById('postorden');
    var re3 = document.getElementById('resultado-postorden');

    re1.innerHTML = 'Resultado PreOrden: <small class="text-muted">' + Arbol.resPreOrder(pre) + '</small>';
    pre = pre.split('').join(', ');
    e1.innerHTML = 'PreOrden: <small class="text-muted">' + pre + '</small>';

    re3.innerHTML = 'Resultado PostOrder: <small class="text-muted">' + Arbol.resPostOrder(post) + '</small>';
    post = post.split('').join(', ');
    e3.innerHTML = 'PostOrden: <small class="text-muted">' + post + '</small>';

    Arbol.crearCanvas(document.getElementById('canvas'));
    console.log("Preorder: " + pre);
    console.log("Postorder: " + post);
    console.log("Resultado es preorder: " + Arbol.resPreOrder(pre));
    console.log("Resultado en postorder: " + Arbol.resPostOrder(post));
}