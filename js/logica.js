let intentos;
let numeroIngresado;
let numeroSecreto;

let entrada = document.getElementById("entradaDelUsuario");
let cuadroAzul = document.getElementById("resultado");
let cuadroRojo = document.getElementById("contadorIntentos");
let genio = document.getElementById("imagenGenio");
let boton = document.getElementById("botonAdivinar");

intentos = 7;
numeroSecreto = Math.floor(Math.random() * 100) + 1;
entrada.maxlength = 2;

function procesar() {
	genio.src = "img/desafio.png";
	numeroIngresado = parseInt(entrada.value);
	entrada.value = "";

	if (intentos > 0) { // LE QUEDAN INTENTOS
		if (isNaN(numeroIngresado)) { // PUSO CUALQUIER COSA
			cuadroAzul.innerText = "Eso no es un número ¬¬";
		} else if (numeroSecreto == numeroIngresado) { // ADIVINO
			ganar();
		} else { // POR DESCARTE, NO ADIVINO
			if (intentos == 1) {
				perder();
			} else {
				adivinar();
			}
		}
	} else { // SE QUEDO SIN INTENTOS
		perder();
	}
}

function adivinar() {
	intentos = intentos - 1;
	cuadroRojo.innerText = ("Te queda" + (intentos != 1 ? "n " : " ") + intentos + " intento" + (intentos != 1 ? "s" : ""));
	if (numeroSecreto > numeroIngresado) {
		cuadroAzul.innerText = ("Nop, es un número más ALTO");
	} else {
		cuadroAzul.innerText = ("Nop, es un número más BAJO");
	}
}

function ganar() {
	boton.disabled = true;
	entrada.disabled = true;
	genio.src = "img/triste.png";
	cuadroAzul.innerText = ("¡Me ganaste! El numero era: " + numeroSecreto);
	cuadroRojo.innerText = ("Adivinaste en " + (8 - intentos) + " intentos.");
}

function perder() {
	genio.src = "img/feliz.png";
	cuadroAzul.innerText = ("¡Te gané! El numero era: " + numeroSecreto);
	cuadroRojo.innerText = ("Te quedaste sin intentos");
}

entrada.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.key === "Enter") {
		procesar();
	}
});
