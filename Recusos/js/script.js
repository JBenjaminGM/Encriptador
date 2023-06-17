const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copia = document.querySelector(".copiar");
copia.style.display = "none";

function validarTexto() {
  let textoEscrito = textArea.value;
  let validador = textoEscrito.match(/^[a-z\s]*$/);

  if (!validador || validador.length === 0) {
    alert("Solo se permiten letras minúsculas y espacios");
    textArea.value = ""; // Limpiar el campo de texto
    return false;
  }

  return true;
}

function btnEncriptar() {
    if (validarTexto()) {
        if (textArea.value.trim() === "") {
            return; // Si no hay texto, no hacer nada
        }

        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        mensaje.style.backgroundImage = "none";
        textArea.value = "";
        copia.style.display = "block";

        // Ocultar el texto adicional
        const textoAdicional = document.querySelector(".texto-adicional");
        textoAdicional.style.display = "none";
    }
}
// Claves de encriptación:
// La letra "e" se convierte en "enter"
// La letra "i" se convierte en "imes"
// La letra "a" se convierte en "ai"
// La letra "o" se convierte en "ober"
// La letra "u" se convierte en "ufat"

function encriptar(stringEncriptada) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function copiar() {
    if (!mensaje.value) {
      return; // Si no hay contenido en el campo de texto encriptado, no se copia nada
    }
  
    navigator.clipboard.writeText(mensaje.value)
      .then(() => {
        mensaje.value = "";
        alert("Texto copiado");
      })
      .catch((error) => {
        console.error("Error al copiar el texto:", error);
      });
  }
