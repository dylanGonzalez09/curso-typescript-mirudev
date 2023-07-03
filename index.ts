let nombre = "Dylan";

let anyValue : any = "Cualquier valor"; // Ignora el tipo de dato - salta el tipe check de tipescript, se debe evitar

let unknowValue : unknown = "Cualquier valor"; // 

// Funciones
function saludar(name: string){ //Colocarle tipos a los parametros para que no se le coloque any por default
    console.log("Hola", name);
}

saludar("Dylan");
saludar(3);

function saludarObj({name, age}){
    console.log("Hola", name, "Tu edad es", age);
}

saludarObj({name: "Dylan", age: 20});

//Tipar objeto

function saludarObj2({name, age}: {name: string, age: number}){ //Forma 1
    console.log("Hola", name, "Tu edad es", age);
}

function saludarObj3(persona: {name: string, age: number}){ //Forma 2
    const {name, age} = persona; //Obligatorio destructurar
    console.log("Hola", name, "Tu edad es", age);
}

saludarObj2({name: "Dylan", age: "20"});

function saludateObj({name, age}: {name: string, age: number}){
    console.log("Hola", name, "Tu edad es", age);
    return age; //El tipo queda registrado en el return inferidamente
}

let username : string = saludateObj({name: "dyg", age: 32}); //Error por el return de arriba


//Funcion como parametro
const f1 = (fn) => {
    return fn("juan");
}

f1((name : string) => {
    console.log(name);
});

//tipo de funcion
const sayHiFromFunction = (fn: (name: string) => void) => { //Decir que tipo de parametro toma y que devuelve

    //callback
    fn("Maria");
}

const sayHi = (name: string) => {
    console.log(name);
}

sayHiFromFunction(sayHi);

//never
function throwError(message: string): never{ //nunca devuelve nada
    throw new Error(message);
}

//inferencia funciones anonimas segun contexto
const avengers = ["spidey", "hulk", "avengers"];

avengers.forEach(avenger => { //Si existe inferencia
    console.log(avenger.toUpperCase());
});

//Objetos