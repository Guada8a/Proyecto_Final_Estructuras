//
$(document).ready(function () {
    $("#verArbol").click(function () {
        $('.modal').modal('show');
    });
});
if (!String.contains) {
    String.prototype.contains = function (it) { return this.indexOf(it) >= 0; };
}
var e1 = document.getElementById('preorden');
var e2 = document.getElementById('inorden');
var e3 = document.getElementById('postorden');

function nuevoArbol() {
    console.log();
    e1.innerHTML = "PreOrden:";
    e2.innerHTML = "InOrden:";
    e3.innerHTML = "PostOrden:";

    var expresion = document.getElementById('txtE').value;
    var nodos = new Arbol(expresion);
    let creacion = nodos.crear();
    window.nodoActual = creacion[0];

    nodos.ordenar();
    document.getElementById('resultado').innerHTML = "Resultado: <small class='text-muted'>" + creacion[0].total + "</small>";
    console.info(creacion);
    document.getElementById('json-arbol').innerHTML = `<pre>${JSON.stringify(creacion[0],null," ")}</pre>`;
}
class Arbol{
    constructor(expresion) {
        this.expresion = expresion;
    }
    crear() {
        let parseo =new Parseo();
        var posFija = parseo.aPosFija(this.expresion);
        var posFija = posFija.split(" ");

        //Pilas
        var entrada = posFija.reverse();
        var salida = [];

        var operadores = "+-*/%^";
        while (entrada.length > 0)
            operadores.contains(entrada[entrada.length - 1]) ? salida.push(new Nodo(entrada.pop(), salida.pop(), salida.pop())) : salida.push(entrada.pop());
        
        return salida;

    }
    evaluar(operador, n2, n1) {
        if (operador == '^')
            return Math.pow(n1, n2);
        
        return eval(n1 + operador + n2);
    }
    getNumber(v) {
        if (isNaN(v)) {
            return v.total
        }
        return v;
    }
    getInfo(v) {
        if (!isNaN(v)) {
            return {
                nodo: v
            }
        }
        return v;
    }
    ordenar() {
        window.preorden = [];
        window.orden = [];
        window.postorden = [];
        var recorrido = new Recorrido();
        
        recorrido.preorden(preorden, nodoActual);
        console.info("PreOrden:" + preorden);
        e1.innerHTML += `<small class="text-muted">${preorden}</small>`;
        
        recorrido.orden(orden, nodoActual);
        console.info("Orden:" + orden);
        e2.innerHTML += `<small class="text-muted">${orden}</small>`;

        recorrido.postorden(postorden, nodoActual);
        console.info("PostOrden:" + postorden);
        e3.innerHTML += `<small class="text-muted">${postorden}</small>`;
    }
}
class Nodo extends Arbol{
    constructor(operador, n2, n1) {
        super();
        return {
            nodo : operador,
            izquierda: this.getInfo(n1),
            derecha: this.getInfo(n2),
            total: this.evaluar(operador, this.getNumber(n2), this.getNumber(n1)),
        }
    }
}
class Parseo{
    constructor(){
        this.operadores = {
            '^': 5,
            '*': 4,
            '/': 4,
            '+': 3,
            '-': 3,
            ')': 2,
            '(': 1
        };
    }
    prepararExpresion(expresion) {
        var simbolos = "+-*/()^";
        var salida = "";
        expresion = expresion.replace(/\\s+/, '');
        expresion = "(" + expresion + ")";

        for (var i = 0; i < expresion.length; i++) {
            if (simbolos.contains(expresion.charAt(i)))
                salida += " " + expresion.charAt(i) + " ";
            else
                salida += expresion.charAt(i);
        }
        console.log(`Expresion: ${salida}`);
        return salida.trim();
    }
    jerarquizar(operador) {
        if (this.operadores[operador]) {
            return this.operadores[operador];
        }
        return 0;
    }
    aPosFija(expresion) {
        expresion = this.prepararExpresion(expresion);
        var abrev = expresion.split(' ');
        var entrada = abrev.reverse();
        var temp = [];
        var salida = [];
        
        while (entrada.length > 0) {
            switch (this.jerarquizar(entrada[entrada.length - 1])) {
                case 1:
                    temp.push(entrada.pop());
                    break;
                case 2:
                    while (temp[temp.length - 1] != '(') {
                        salida.push(temp.pop());
                    }
                    temp.pop();
                    entrada.pop();
                    break;
                case 3:
                case 4:
                case 5:
                    while (this.jerarquizar(temp[temp.length - 1]) >= this.jerarquizar(entrada[entrada.length - 1])) {
                        salida.push(temp.pop());
                    }
                    temp.push(entrada.pop());
                    break;
                default:
                    salida.push(entrada.pop());
            }
        }
        return salida.join(' ').replace(/\s{2,}/g, ' ').trim();
    }
}
class Recorrido{
    constructor(nodoActual){
        this.nodoActual = nodoActual;
    }
    //Recorrido preorden {raiz, izquierda, derecha}
    preorden(preorden, nodoActual) {
        if (nodoActual == null) return;
        preorden.push(nodoActual.nodo);
        if (!nodoActual.izquierda && !nodoActual.derecha) return;
        this.preorden(preorden, nodoActual.izquierda);
        this.preorden(preorden, nodoActual.derecha);
    }
    //Recorrido orden {izquierda, raiz, derecha}
    orden(orden, nodoActual) {
        if (nodoActual == null) return;
        this.orden(orden, nodoActual.izquierda);
        orden.push(nodoActual.nodo);
        if (!nodoActual.izquierda && !nodoActual.derecha) return;
        this.orden(orden, nodoActual.derecha);
    }
    //Recorrido postorden {izquierda, derecha, raiz}
    postorden(postorden, nodoActual) {
        if (nodoActual == null) return;
        if (nodoActual.izquierda && nodoActual.derecha) {
            this.postorden(postorden, nodoActual.izquierda);
            this.postorden(postorden, nodoActual.derecha);
        }
        postorden.push(nodoActual.nodo);
    }
}