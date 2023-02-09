let intentos;
let numeroIngresado;
let numeroSecreto;

let nroUsuario = document.getElementById("nroUsuario");
let mensaje = document.getElementById("mensaje");
let contIntentos = document.getElementById("contIntentos");
let genioImg = document.getElementById("genioImg");
let arriesgarBtn = document.getElementById("arriesgarBtn");
let checkboxAyuda = document.getElementById("checkboxAyuda");
let ayuda = document.getElementById("ayuda");
let ayuda1Span = document.getElementById("ayuda1");
let ayuda2Span = document.getElementById("ayuda2");
let modal = document.getElementById("myModal");
let cierreModal = document.getElementById("close");

let min = 1;
let max = 100;

intentos = 7;
numeroSecreto = Math.floor(Math.random() * 100) + 1;
nroUsuario.maxlength = 2;
mostrar(ayuda, false);
refreshAyuda(min, max);

function procesar() {
	genioImg.src = "img/desafio.png";
	mostrar(contIntentos, true);
	numeroIngresado = parseInt(nroUsuario.value);
	nroUsuario.value = "";

	if (intentos > 0) { // LE QUEDAN INTENTOS
		if (isNaN(numeroIngresado)) { // PUSO CUALQUIER COSA
			mensaje.innerText = "Eso no es un número 🙄";
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
		mensaje.innerText = (`Arriesgaste ${numeroIngresado}\nNop, es un número más ALTO 🤭`);
		refreshAyuda(numeroIngresado + 1, max);
	} else {
		mensaje.innerText = (`Arriesgaste ${numeroIngresado}\nNop, es un número más BAJO 🤭`);
		refreshAyuda(min, numeroIngresado - 1);
	}
}

function ganar() {
	desactivarHUD();
	genioImg.src = "img/triste.png";
	mensaje.innerText = ("¡Me ganaste! 😢 El numero era: " + numeroSecreto);
	contIntentos.style.color = "#4af163";
	let cuantos = (8 - intentos);
	contIntentos.innerText = ("¡Adivinaste en " + cuantos + " intento" + checkPlural(cuantos) + "!");
}

function perder() {
	desactivarHUD();
	genioImg.src = "img/feliz.png";
	mensaje.innerText = ("¡Te gané! 😁 El numero era " + numeroSecreto);
	contIntentos.innerText = ("Te quedaste sin intentos");
}

function desactivarHUD() {
	mostrar(arriesgarBtn, false);
	mostrar(nroUsuario, false);
	mostrar(ayuda, false);
}

function checkPlural(x) {
	return x != 1 ? "s" : "";
}

function mostrar(comp, flag) {
	comp.style.display = flag ? "block" : "none";
}

function refreshAyuda(a, b) {
	min = a;
	max = b;
	if (min == max) {
		ayuda1.innerHTML = `El número tiene que ser el ${min} 🙏`;
	} else {
		ayuda1.innerHTML = `El número está entre ${min} y ${max} 🧠`;
	}
	let dif = max - min;
	if (dif > 1) {
		let n = parseInt((dif / 2) + min);
		ayuda2.innerHTML = `Te conviene arriesgar el ${n} 😉`;
	} else if (dif == 1) {
		ayuda2.innerHTML = `El que tu ❤️ diga: ${min} ó ${max}`;
	} else  {
		ayuda2.innerHTML = "";
	}
}

nroUsuario.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.key === "Enter") {
		procesar();
	}
});

checkboxAyuda.addEventListener("change", (e) => {
	e.preventDefault();
	console.log(e)
	mostrar(ayuda, e.target.checked);
});

genioImg.addEventListener("click", (e) => {
	mostrar(modal, true);
});

cierreModal.addEventListener("click", (e) => {
	mostrar(modal, false);
});