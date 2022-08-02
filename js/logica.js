let intentos;
let numeroIngresado;
let numeroSecreto;

let nroUsuario = document.getElementById("nroUsuario");
let mensaje = document.getElementById("mensaje");
let contIntentos = document.getElementById("contIntentos");
let genioImg = document.getElementById("genioImg");
let arriesgarBtn = document.getElementById("arriesgarBtn");

intentos = 7;
numeroSecreto = Math.floor(Math.random() * 100) + 1;
nroUsuario.maxlength = 2;

function procesar() {
	genioImg.src = "img/desafio.png";
	contIntentos.style.display = "block";
	numeroIngresado = parseInt(nroUsuario.value);
	nroUsuario.value = "";

	if (intentos > 0) { // LE QUEDAN INTENTOS
		if (isNaN(numeroIngresado)) { // PUSO CUALQUIER COSA
			mensaje.innerText = "Eso no es un número";
			genioImg.src = "img/enojado.png";
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
	contIntentos.innerText = ("Te queda" + (intentos != 1 ? "n " : " ") + intentos + " intento" + checkPlural(intentos));
	if (intentos == 1) contIntentos.style.color = "#f14a4a";
	else if (intentos == 2) contIntentos.style.color = "#f19d4a";
	else if (intentos == 3) contIntentos.style.color = "#f1f14a";
	if (numeroSecreto > numeroIngresado) {
		mensaje.innerText = (`Arriesgaste ${numeroIngresado}\nNop, es un número más ALTO`);
	} else {
		mensaje.innerText = (`Arriesgaste ${numeroIngresado}\nNop, es un número más BAJO`);
	}
}

function ganar() {
	desactivarHUD();	
	genioImg.src = "img/triste.png";
	mensaje.innerText = ("¡Me ganaste! El numero era: " + numeroSecreto);
	contIntentos.style.color = "#4af163";
	let cuantos = (8 - intentos);
	contIntentos.innerText = ("¡Adivinaste en " + cuantos + " intento" + checkPlural(cuantos) + "!");
}

function perder() {
	desactivarHUD();
	genioImg.src = "img/feliz.png";
	mensaje.innerText = ("¡Te gané! El numero era " + numeroSecreto);
	contIntentos.innerText = ("Te quedaste sin intentos");
}

function desactivarHUD() {
	arriesgarBtn.style.display = "none";
	nroUsuario.style.display = "none";
}

function checkPlural(x) {
	return x != 1 ? "s" : "";
}

nroUsuario.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.key === "Enter") {
		procesar();
	}
});
