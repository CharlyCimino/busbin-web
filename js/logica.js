var intentos;
var numeroIngresado;
var numeroSecreto;

var entrada = document.getElementById("entradaDelUsuario");
var cuadroAzul = document.getElementById("resultado");
var cuadroRojo = document.getElementById("contadorIntentos");
var genio = document.getElementById("imagenGenio");
var boton = document.getElementById("botonAdivinar");

intentos = 10;
numeroSecreto = Math.floor( Math.random() * 99 ) + 1;
entrada.maxlength = 2;

function adivinar ()
{
	genio.src = "img/desafio.png";
	numeroIngresado = parseInt(entrada.value);
	entrada.value = "";

	if (intentos > 0) // LE QUEDAN INTENTOS
	{
		if ( isNaN( numeroIngresado ) ) // PUSO CUALQUIER COSA
		{
			cuadroAzul.innerText = ("Eso no es un número ¬¬");
		}
		else if (numeroSecreto == numeroIngresado)  // ADIVINO
		{
			boton.disabled = true;
			entrada.disabled = true;
			genio.src = "img/triste.png";
			cuadroAzul.innerText = ("Me ganaste ! El numero era: " + numeroSecreto);
			cuadroRojo.innerText = ("Adivinaste en " + (11-intentos) +" intentos.");
		}
		else // POR DESCARTE, NO ADIVINO
		{
			intentos = intentos - 1; // intentos--;
			cuadroRojo.innerText = ("Te quedan " + intentos + " intentos");

			if (numeroSecreto > numeroIngresado )
			{
				cuadroAzul.innerText = ("Te quedaste cortina, pensé un número más alto");
			} 
			else 
			{
				cuadroAzul.innerText = ("Te pasaste, pensé un número más bajo");
			}
		}
	}
	else // SE QUEDO SIN INTENTOS
	{
		genio.src = "img/feliz.png";
		cuadroAzul.innerText = ("Te gané ! El numero era: " + numeroSecreto);
		cuadroRojo.innerText = ("Te quedaste sin intentos");
	}
}