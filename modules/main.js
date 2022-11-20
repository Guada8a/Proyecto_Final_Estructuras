if (!String.contains) {
    String.prototype.contains = function (e) {
        return this.indexOf(e) >= 0;
    }
}


function recorrerEnOrden() {
    var log1 = [],
        log2 = [];

    Recorrido.preorden(nodoActual, log1);
    console.info("Recorrido PreOrden", log1)

    Recorrido.postorden(nodoActual, log2);
    console.info("Recorrido PostOrden", log2)

}



function nuevoArbol() {
    console.log()
    alert('Resultados desplegados en consola')
    let expresion = document.getElementById('txtE').value
    var nodos = Arbol.crear(expresion);
    window.nodoActual = nodos[0];

    recorrerEnOrden();

    console.info(nodos);
}


var Parcer = {

    operadores: {
        '^': 5,
        '*': 4,
        '/': 4,
        '+': 3,
        '-': 3,
        ')': 2,
        '(': 1,
        obtenerPrecedencia: function () {

        }
    },

    
    //Depura la expresion algebraica, quita espacios en blanco y deja un espacio entre operadores y digitos
    prepararExpresion: function (expresion) {
        var simbolos = "+-*/()^";
        var salida = "";
        expresion = expresion.replace(/\\s+/, '');
        expresion = "(" + expresion + ")";
        for (var i = 0; i < expresion.length; i++) {
            if (simbolos.contains(expresion.charAt(i))) {
                salida += " " + expresion.charAt(i) + " ";
            } else {
                salida += expresion.charAt(i);
            }

        }
        return salida.trim();
    },
    //Determinar jerarquia de operadores
    jerarquia: function (operador) {
        if (this.operadores[operador]) {
            return this.operadores[operador];
        }
        //si no es un operador tiene mayor precedencia
        return 99;
    },
    aPosFija: function (expresion) {
        expresion = this.prepararExpresion(expresion);
        var infija = expresion.split(" ");

        var E = infija.reverse(), // Entrada
            P = [], // Temporal
            S = []; //salida

        while (E.length > 0) {

            // E[E.length - 1] extrae el ultimo valor de la pila  .peek();
            // console.info("E", E, "S", S, "P", P)
            switch (this.jerarquia(E[E.length - 1])) {
            case 1:
                P.push(E.pop());
                break;
            case 2:
                while (P[P.length - 1] != "(") {
                    S.push(P.pop())
                }
                P.pop();
                E.pop();
                break;
            case 3:
            case 4:
            case 5:
                while (this.jerarquia(P[P.length - 1]) >= this.jerarquia(E[E.length - 1])) {
                    S.push(P.pop());
                }
                P.push(E.pop());
                break;
            default:
                S.push(E.pop());
            }
        }
            //quita las comas y coloca espacio
        return S.join(" ")
            //elimina 2 o mas espacios juntos
            .replace(/\s{2,}/g, ' ').
            //elimina espacios al inicio y final
        trim();
    }


};

var Arbol = {

    crear: function (expresion) {
        var posfija = Parcer.aPosFija(expresion);
        console.info("Expresion posfija: ", posfija);
        //ejemplo Posfija = "2 23 6 + * 1 -";

        var posfija = posfija.split(" ");



        //Declaración de las pilas
        var E = posfija.reverse(); //Pila entrada
        var P = []; //Pila de operandos
        console.info(E)
        //Algoritmo de Evaluación Postfija
        var operadores = "+-*/%^";
        while (E.length > 0) {
            //Si es un operador
            if (operadores.contains(E[E.length - 1])) {
                P.push(this.crearNodo(E.pop(), P.pop(), P.pop()));
            } else {
                P.push(E.pop());
            }
        }
        //retorna nodos
        return P;
    },


    evaluar: function (operador, n2, n1) {
        console.info(n1 + operador + n2);

        if (operador == '^') {
            return Math.pow(n1, n2);
        }
        return eval(n1 + operador + n2);
    },
    getNumber: function (v) {
        if (isNaN(v)) {
            return v.data
        }
        return v;
    },
    getInfo: function (v) {
        // Es un digito
        if (!isNaN(v)) {
            return {
                label: v
            }
        }
        // Es resultado de una operacion
        return v;
    },
    crearNodo: function (operador, n2, n1) {
        return {
            label: operador,
            expanded: true,
            children: [this.getInfo(n1), this.getInfo(n2),
        ],
            data: this.evaluar(operador, this.getNumber(n2), this.getNumber(n1))
        };
    }
};

var Recorrido = {
    //(raíz, izquierdo, derecho)
    preorden: function (nodo, log) {
        if (nodo == null)
            return;

        //mostrar datos del nodo
        log.push(nodo.label);
        if (!nodo.children)
            return;
        this.preorden(nodo.children[0], log); //recorre subarbol izquierdo
        this.preorden(nodo.children[1], log); //recorre subarbol derecho
    },
    //(izquierdo, derecho, raíz)
    postorden: function (nodo, log) {
        if (nodo == null)
            return;
        if (nodo.children) {
            this.postorden(nodo.children[0], log);
            this.postorden(nodo.children[1], log);
        }
        log.push(nodo.label);
        // console.info(nodo.label);
    }
    
}