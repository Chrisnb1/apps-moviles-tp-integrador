$(document).ready(function() {
    var product = localStorage.getItem('share');
    console.log(product);
    productJson = JSON.parse(product);
    console.log(productJson.title)
    completeForm(productJson);
    startApp();

});

const completeForm = (item) => {
    $('#name').val(item.title);
    $('#price').val(parseInt(item.price.replace("$", "")));

}

// Campos
const nom = document.getElementById("name");
const price = document.getElementById("price");
const email = document.getElementById("email");
const comment = document.getElementById("comment");

// Botones
const btnSend = document.getElementById("btn-send");
const btnCancel = document.getElementById("btn-cancel");

// Eventos
eventListeners();

function eventListeners() {
    //Inicio de app

    // Campos del formulario
    nom.addEventListener("blur", validate);
    nom.addEventListener("keyup", validate);
    price.addEventListener("blur", validate);
    price.addEventListener("keyup", validate);
    email.addEventListener("blur", validate);
    email.addEventListener("keyup", validate);


    // Boton enviar
    btnSend.addEventListener("click", sendForm);

    // Boton cancelar
    btnCancel.addEventListener("click", cancelForm);

}

//Funciones
function startApp() {
    //deshabilitar el envio
    btnSend.disabled = true;
}

//Valida que el campo no este vacio
function validate() {
    //Se valida la longitud del texto y que no este vacio
    validateLong(this);

    // Lista de errores
    let mistakes = document.querySelectorAll(".error");

    // habilitamos el boton cuando esten todos los campos llenos
    if (
        nom.value !== "" &&
        price.value !== "" &&
        email.value !== ""

    ) {
        if (mistakes.length === 0) {
            btnSend.disabled = false;
        }
    }
}

// Verifica la longitud del texto en los campos
function validateLong(input) {
    if (input.value.length > 0) {
        //Validar solo carácteres
        if (
            input.name === "name"

        ) {
            validateCharacter(input);
        } else if (input.name === "price") {
            validateNumber(input);
        } else if (input.name === "email") { //Validar solo email
            validateEmail(input);
        }
    } else {
        setError(input, "campo vacio invalido");
        input.classList.add("error");
    }
}

// Verifica los carácteres
function validateCharacter(input) {
    let message = input.value;

    if (!onlyLetters(message)) {
        setError(input, "Carácteres inválidos.");
        input.classList.add("error");
    } else {
        setSuccess(input);
        input.classList.remove("error");
    }
}

// Verifica el campo precio
function validateNumber(input) {
    let message = input.value;

    if (message > 0) {
        setSuccess(input);
        input.classList.remove("error");
    } else {
        setError(input, "El precio no puede ser negativo o cero");
    }
}
// Verifica que el email sea correcto
function validateEmail(input) {
    let message = input.value;

    if (!isEmail(message)) {
        setError(email, "No ingreso un email valido.");
    } else {
        setSuccess(input);
        input.classList.remove("error");
    }
}

// Se envia el formulario
function sendForm(e) {
    e.preventDefault();
    let form = document.getElementById("form");
    let plate = form.elements.name.value;
    let price = form.elements.price.value;
    let email = form.elements.email.value;
    let comment = form.elements.comment.value;

    let body = `           
        Plato: ${plate}
        \n Precio: ${price}
        \n Comentario: ${comment} `;

    window.open('mailto:' + email + '?subject=Compartir%20plato%20con%20un%20amigo&body=' + body);
    swal({
        title: "Compartir",
        text: "Se abrio su gestor de correo para compartir el plato con un amigo!!!",
        icon: "success"
    }).then(() => {
        backPage("products.html");
    });
}

// Cancela el formulario
function cancelForm(e) {
    e.preventDefault();
    swal({
        title: "Cancelar",
        text: "Desea volver a la pagina de inicio?",
        icon: "warning",
        buttons: { yes: "Si", no: "No" },
    }).then((value) => {
        if (value === "yes") {
            backPage("index.html");
        }
    });
}

// Mostrar error
function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
    return false;
}

// Mostrar correcto
function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    return true;
}

// Vuelve a la pagina anterior
function backPage(route) {
    window.location.href = route;
}

// Solo letras
function onlyLetters(input) {
    return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input);
}

// Solo Email
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}