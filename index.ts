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

// Type alias 

//Template union type
type HeroId = `${string}-${string}-${string}-${string}-${string}`;

// No se distingue si ambos objetos son iguales, por eso se usan los tipe alias
type Hero = { //tipo propio en pascal case
    //evitar mutabiliadad en el id linea 112
    readonly id?: HeroId, //Solo es lectura
    //id?: number,
    name: string,
    age: number,
    isActive?: boolean //? significa que es opcional
}

const hero : Hero = {
    name: 'Thor',
    age: 1500
}

const createHero = (name: string, age: number) : Hero => {
    return {name, age}
}
const thor = createHero('Thor', 1500);

//Con parametros
const createHero2 = (hero : Hero) : Hero => {
    const {name, age} = hero;

    return {id: crypto.randomUUID(), name, age, isActive: true}
}
const thor2 = createHero2({name: 'Thor', age: 1500});
console.log(thor2.isActive); //--> true


thor2.id?.toString(); // ? encadenamiento opcional, si tiene una ID lo ejecuta, si no, lo evita

//Problema con la mutabilidad
//thor2.id = 241354212314 //Al ser solo lectura, no se puede mutar. Solo en desarrollo

//Otro ejemplo con template union types
type color = `#${string}`;

const color1 : color = '000' //Marca error ya que debe tener # antes
const color2 : color = '#000'

// Union types
type HeroId2 = `${string}-${string}-${string}-${string}-${string}`;
type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal' | 'omnipresent'; //Tipo de union | en donde la escala puede ser cualquiera de las cadenas de texto

let ann : number | HeroPowerScale
ann = 'local'

// No se distingue si ambos objetos son iguales, por eso se usan los tipe alias
type Hero2 = { //tipo propio en pascal case
    //evitar mutabiliadad en el id linea 112
    readonly id?: HeroId, //Solo es lectura
    //id?: number,
    name: string,
    age: number,
    isActive?: boolean, //? significa que es opcional
    powerScale? : HeroPowerScale
}

//Con parametros
const createHero4 = (hero : Hero2) : Hero2 => {
    const {name, age} = hero;

    return {id: crypto.randomUUID(), name, age, isActive: true}
}
const thor4 = createHero4({name: 'Thor', age: 1500});
thor4.powerScale = 'planetary'

//Intersection types
type HeroId4 = `${string}-${string}-${string}-${string}-${string}`;
type HeroPowerScale2 = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal' | 'omnipresent'; //Tipo de union | en donde la escala puede ser cualquiera de las cadenas de texto

type HeroBasicInfo = {
    name: string,
    age: number,
}

type HeroProperties = { 
    readonly id?: HeroId, 
    isActive?: boolean,
    powerScale? : HeroPowerScale
}

type NewHero = HeroBasicInfo & HeroProperties // Uniendo ambos

const createHero5 = (hero : HeroBasicInfo) : NewHero => {
    const {name, age} = hero;

    return {id: crypto.randomUUID(), name, age, isActive: true}
}
const thor3 = createHero4({name: 'Thor', age: 1500});
thor3.powerScale = 'planetary'

//Type indexing
type HeroProperties2 = {
    isActive: boolean,
    address: {
        planet: string,
        city: string
    }
}

const addressHero : HeroProperties2['address'] = {
    planet: 'Earth',
    city: 'Panama'
}

//Type from value - crear tipo a travez de una constante
const address2 = {
    planet: 'Earth',
    city: 'Panama'
}

type Address = typeof address2 

//Type from function return

function createAddress(){
    return {
        planet: 'Tierra',
        city: 'Panama'
    }
}

type Address2 = ReturnType<typeof createAddress> //el type guarda el type que retorna la funcion

//Arrays
const languajes = [] //Siempre esta vacio

languajes.push('Javascript')

//const languajes2 : string[] = []
const languajes2 : Array<string> = []

languajes2.push('Javascript')

//Mezclando 2 tipos
const languajes3 : (string | number)[] = []

//Matrices
type CellValue = 'x' | '0' | ''
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
] 

const gameBoard : GameBoard = [ //Tupla
    ['x','0','x'],
    ['x','0','0'],
    ['x','0','x']
]

