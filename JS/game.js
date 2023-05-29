// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

console.log(posibilidades);


//array para las imagenes jugador
posibilidades = [
    {
        name: "piedra",
        url: "img/piedraJugador.png"
    },
    {
        name: "papel",
        url: "img/papelJugador.png"
    },
    {
        name: "tijera",
        url: "img/tijeraJugador.png"
    }
];

// array img cpu
const img = [ "img/piedraOrdenador.png" , "img/papelOrdenador.png" , "img/tijeraOrdenador.png"];

//Constantes de utilidad
const usuario = document.getElementsByName('nombre')[0];
const partidas = document.getElementsByName('partidas')[0];
const total = document.getElementById('total');
    //Botones
const botonJugar = document.getElementsByTagName('button')[0]; 
const botonYA = document.getElementsByTagName('button')[1];
const botonReset = document.getElementsByTagName('button')[2];
    //Botones img
const piedra = document.getElementsByTagName('img')[0];
const papel = document.getElementsByTagName('img')[1];
const tijera = document.getElementsByTagName('img')[2];

const jugador = document.getElementById('jugador');
const maquina = document.getElementById('maquina');
const actual = document.getElementById('actual');
const historial = document.getElementById('historial');
// Var para el conteo de partidas
let contador = 0;


//Funcion que reconoce el nombre de usuario y el numero de partidas al plisar el button YA
botonJugar.addEventListener('click',  function() {

    //validamos el nombre de usuario
    if(usuario.value.length <= 3 || !isNaN(parseInt(usuario.value.charAt(0)))) {
        usuario.classList.add('fondoRojo');
    }

    //validamos el nº de partidas
    if(partidas.value <= 0) {
        partidas.classList.add('fondoRojo');
    }

    //Si todo es correcto, añadimos el nº partidas seleccionadas al html
    if(!usuario.classList.contains('fondoRojo') && !partidas.classList.contains('fondoRojo')) {
        total.textContent = partidas.value; //de esat forma añadimos el nº de partidas
        usuario.disabled = true;
        partidas.disabled = true;
    }

});


// Recorremos el div jugador para marcar y desmarcar las opciones
for(let i = 0; i < jugador.children.length; i++){
    jugador.children[i].addEventListener('click', function() {
        //eliminamos el estilo seleccionado
        for(let j = 0; j < jugador.children.length; j++) {
            jugador.children[j].classList.remove('seleccionado');
            jugador.children[j].classList.add('noSeleccionado');
        }

        // aplicamos estilo 
        this.classList.add('seleccionado');
        this.classList.remove('noSeleccionado');
    
    });
}


// Eventos boton YA!
botonYA.addEventListener('click', function() {
    
    // generamos una opcion aleatoria para la cpu
    const cpu = Math.floor(Math.random() * img.length);
    const cpuOp = img[cpu];
    maquina.innerHTML = '<img src=' + '"' + cpuOp +'">'; //asignamos la img aleatoria de la cpu

    // actualizamos el contador de partidas
    contador++;
    actual.textContent = contador;

    // comprobamos el resultado de la partida
    const player = Array.from(jugador.children).findIndex(option => option.classList.contains('seleccionado'));
    const playerOpt = posibilidades[player];
    
    // Limitamos el número de partidas
    if(actual.textContent == total.textContent) {
        botonYA.disabled = true;
    }

    if(player === cpu) {
        historial.innerHTML += '<li> Empate </li>';

    } else if ((player === 0 && cpu === 2 ) || (player > cpu)) {
        historial.innerHTML += '<li> Gana jugador ' + usuario.value + '</li>';
    } else {
        historial.innerHTML += '<li> Gana CPU </li>';
    }
});

// Eventos boton RESET
botonReset.addEventListener('click', function() {
    historial.innerHTML += '<li> Nueva partida </li>';
    maquina.innerHTML = '<img src="img/defecto.png"></img>';
    usuario.disabled = false;
    partidas.disabled = false;
    botonYA.disabled = false;
    actual.textContent = 0;
    total.textContent = 0;

});



