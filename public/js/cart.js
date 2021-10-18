// Variables
const cart = document.getElementById('cart');
// const cards = $("#cards");
const items = $("#items");
const add_buttom = $(".btn-cart");


if (cart) {
    cart.addEventListener('change', (e) => { updateAmount(e) }); //Actualiza la amount de productos
}


// Jquery evento agregar a carrito/botones
$(document).ready(function() {
    add_buttom.click(addCart);
    readLocalStorage();

});

// Click en boton "añadir a carrito"
export function addCart() {
    getItemCard(this);

}

// Crea el objeto producto referido al item clickeado
function getItemCard(item) {
    let id = $(item).attr("id");
    let parent = $(item).parent("div").parent("div");
    let product = {
        img: parent.find("img").attr("src"),
        title: parent.find(".title-card").text(),
        precio: parent.find(".price-card").text(),
        id: id,
        amount: 1
    };

    insertCart(product)
}


// Muestra en el carrito
function insertCart(item) {

    if (exists(item.id) === 1) {
        calculateTotal();
        return;
    } else {
        var newRow =
            `<tr id=${item.id}>
            <td>
                <img src=${item.img}>
            </td>
            <td>
                ${item.title}
            </td>
            <td>
                <input id="${item.id}" type="number" class="form-control text-center amount" min="1" max="5" style="width:50px"; background="#fcfcfc9a"; value=${item.amount}>
            </td>
            <td>
                ${item.precio}
            </td>
            <td>
                <button class="btn-remove" id="${item.id}"><span class="material-icons-outlined">highlight_off</span></button>
            </td>
            </tr>
            `;

        $(newRow).appendTo(items);

        var btnRemove = $('.btn-remove');

        btnRemove.click(function() {
            eliminateItemCart(item.id);

        });
        saveLocalStorage(item);
    }

}

// Guardamos en la lista del local storage
function saveLocalStorage(item) {
    let itemsLS;

    //Obtiene la lista del LS
    itemsLS = getLocalStorage();

    //Se agrega al LS
    itemsLS.push(item);

    localStorage.setItem('itemsLS', JSON.stringify(itemsLS));
}

// Obtiene la lista del local storage
function getLocalStorage() {
    let itemsLS;

    //Si hay elementos en el LS
    if (localStorage.getItem('itemsLS') === null) {
        itemsLS = [];
    } else {
        itemsLS = JSON.parse(localStorage.getItem('itemsLS'));
    }

    return itemsLS;
}

// Busca item en el carrito (ventana modal)
function searchItemCart(id) {
    return $('tr#' + id).lenght;
}

function readLocalStorage() {
    let itemsLS;

    //Obtenemos la lista del LS
    itemsLS = getLocalStorage();

    itemsLS.forEach(function(item) {
        var newRow =
            `<tr id=${item.id}>
            <td>
                <img src=${item.img}>
            </td>
            <td>
                ${item.title}
            </td>
            <td>
                <input id="${item.id}" type="number" class="form-control text-center amount" min="1" max="5" style="width:30px"; background="#fcfcfc9a"; value=${item.amount}>
            </td>
            <td>
                ${item.precio}
            </td>
            <td>
                <button class="btn-remove" id="${item.id}"><span class="material-icons-outlined">highlight_off</span></button>
            </td>
            </tr>
            `;

        $(newRow).appendTo(items);
    })

    var btnRemove = $('.btn-remove');

    btnRemove.click(function() {
        var id = $(this).attr("id");
        eliminateItemCart(id);
    });
    calculateTotal();
}

// Elimina item en el carrito (ventana modal)
function eliminateItemCart(id) {
    $('tr#' + id).remove();
    eliminateItemLocalStorage(id);
    calculateTotal();
}

function eliminateItemLocalStorage(itemId) {
    let itemsLS = getLocalStorage();

    itemsLS.forEach(function(item, index) {
        if (item.id == itemId) {
            itemsLS.splice(index, 1);
        }
    });

    //Actualiza el LS
    localStorage.setItem('itemsLS', JSON.stringify(itemsLS));
}


// Calcula el precio total
function calculateTotal() {
    let amount, price;
    let total = 0;
    let itemsLS = getLocalStorage();
    itemsLS.forEach((item) => {
        price = parseInt(item.precio.replace("$", ""));
        amount = price * item.amount;
        total += amount;
    });

    $('#total').text('$ ' + total);
    return total;
}

function updateAmount(e) {
    e.preventDefault();

    let id, amount, item, itemsLS;
    itemsLS = getLocalStorage();
    //si existe el elemento amount actualiza el precio.
    if (e.target.classList.contains('amount')) {
        //obtengo los elementos del dom y los valores
        item = e.target.parentElement.parentElement;
        id = item.querySelector('input').getAttribute('id');
        amount = item.querySelector('input').value;
        //Por cada producto actualiza la amount
        itemsLS.forEach(it => {
                if (it.id === id) {
                    it.amount = parseInt(amount);
                }
            })
            //Actualiza la lista en localStorage
        localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
    }
    calculateTotal();
}


// Verifica si existe el item en el carrito
export function exists(id) {
    let num = 0;
    let itemsLS = getLocalStorage();
    itemsLS.forEach((item) => {
        if (item.id === id) {
            num = 1;
            viewModal(num);
        }

    });
    viewModal(num);
    return num;
}

//Vaciar LS
function clearLocalStorage() {
    localStorage.clear();
}

function viewModal(input) {
    if (input === 1) {
        Swal.fire({
            title: 'PLATO EN CARRITO',
            icon: 'info',
            html: 'Este plato ya se encuentra en el carrito'
        })
    } else {
        Swal.fire({
            title: 'PLATO AÑADIDO',
            icon: 'success',
            html: 'Se añadio este plato al carrito'
        })
    }

}

// clearLocalStorage();