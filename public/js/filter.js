import { addCart } from '../js/cart.js'

const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const urlGetIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
const urlGetByIngredients = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const resultsDiv = $('.products-div');

const btnContainer = $('.btn-container');

let name_repeat = '';
let area_repeat = '';
let ingredient_repeat = '';

$(document).ready(function() {
    searchByName();
    getAreas();
    searchByArea();
    getIngredients();
    searchByIngredient();
});

const searchByName = () => {
    $('.btn-search').click(function(event) {
        event.preventDefault();
        let name = $('#name').val();

        if (name === '' || name === name_repeat) {
            return;
        }

        getProductsByName(name);
        name_repeat = name;

    })
}

const getProductsByName = (name) => {
    console.log(name);
    $.ajax({
        url: urlSearchByName + name,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            if (datos.meals === null) {
                Swal.fire({
                    title: "Error",
                    text: "No se encontro el plato que busco!!!",
                    icon: "error"
                })
            } else {
                renderProducts(datos);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}


const getAreas = () => {
    $.ajax({
        url: urlGetAreas,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            mostrarAreas(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const mostrarAreas = (datos) => {
    $.each(datos.meals, function(index, obj) {

        $(`<option value="${obj.strArea}">${obj.strArea}</option>`).appendTo($('#area'));
    })
}

const searchByArea = () => {
    $('.btn-search').click(function(event) {
        event.preventDefault();
        let area = $('#area').val();

        if (area === '' || area === area_repeat) {
            return;
        }
        getByArea(area);
        area_repeat = area;
    })
}

const getByArea = (area) => {
    $.ajax({
        url: urlGetByAreas + area,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            renderProducts(datos);

        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const getIngredients = () => {
    $.ajax({
        url: urlGetIngredients,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            console.log('entro aca')
            mostrarIngredientes(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const mostrarIngredientes = (datos) => {
    $.each(datos.meals, function(index, obj) {

        $(`<option value="${obj.strIngredient}">${obj.strIngredient}</option>`).appendTo($('#ingredient'));
    })
}

const searchByIngredient = () => {
    $('.btn-search').click(function(event) {
        event.preventDefault();
        let ingredient = $('#ingredient').val();

        if (ingredient === '' || ingredient === ingredient_repeat) {
            return;
        }
        console.log(ingredient)
        getByIngredient(ingredient);
        ingredient_repeat = ingredient;
    })
}

const getByIngredient = (ingredient) => {
    $.ajax({
        url: urlGetByIngredients + ingredient,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            renderProducts(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProducts = (datos) => {
    resultsDiv.empty();
    $.each(datos.meals, function(index, obj) {
        let product =
            `
        <div class="card">
            <h1 class="title-card">${obj.strMeal}</h1>
            <img class"img-card" src="${obj.strMealThumb}" alt="${obj.strMeal}">
            <h1 class="price-card" id="price">$1000</h1>
            <br>
            <div class"icons-cards">
                <button class="btn-details btn-product" id="${obj.idMeal}"><span class="material-icons-outlined">
                view_list
                </span></button>
                <button class="btn-share btn-product" id="share-${obj.idMeal}"><span class="material-icons-outlined">
                share
                </span></button>
                <button class="btn-cart btn-product" id="${obj.idMeal}"><span class="material-icons-outlined">
                add_shopping_cart
                </span></button>
            </div>
            
        </div>
        `;
        $(product).appendTo(resultsDiv);

        if (index === 9) {
            let btnSeeMore =
                `
            <a class="see-more"><img src="https://img.icons8.com/material-sharp/48/000000/plus--v1.png"/></a>
            `;
            $(btnSeeMore).appendTo(btnContainer);
            return false;
        }
    });

    var btnsDetails = $('.btn-details');

    btnsDetails.click(function() {
        var id = $(this).attr("id");
        console.log(id);
        getProductDetails(id);

    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e) {
        console.log(((e.target.parentElement).parentElement).parentElement);
        getItem(((e.target.parentElement).parentElement).parentElement);
    });

    var btnCart = $('.btn-cart');
    btnCart.click(addCart);

    var btnMore = $('.see-more');
    btnMore.click(function() {
        renderMoreProducts(datos);
    });
}

const getProductDetails = (id) => {
    $.ajax({
        url: urlProductDetails + id,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            renderProductsDetails(datos, id);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderMoreProducts = (datos) => {
    $.each(datos.meals, function(index, obj) {
        if (index > 9) {
            let product =
                `
        <div class="card">
            <h1 class="title-card">${obj.strMeal}</h1>
            <img class"img-card" src="${obj.strMealThumb}" alt="${obj.strMeal}">
            <h1 class="price-card" id="price">$1000</h1>
            <br>
            <div class"icons-cards">
                <button class="btn-details btn-product" id="${obj.idMeal}"><span class="material-icons-outlined">
                view_list
                </span></button>
                <button class="btn-share btn-product" id="share-${obj.idMeal}"><span class="material-icons-outlined">
                share
                </span></button>
                <button class="btn-cart btn-product" id="${obj.idMeal}"><span class="material-icons-outlined">
                add_shopping_cart
                </span></button>
            </div>
            
        </div>
        `;
            $(product).appendTo(resultsDiv);
            $('.see-more').hide();
        }
    });

    var btnsDetails = $('.btn-details');

    btnsDetails.click(function() {
        var id = $(this).attr("id");
        var historyList = localStorage.getArray('historyList');

        if (historyList.includes(id)) {
            console.log('Ya esta en el historial');
        } else {
            localStorage.pushArrayItem('historyList', id);
        }

        getProductDetails(id);
    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e) {
        console.log(((e.target.parentElement).parentElement).parentElement);
        getItem(((e.target.parentElement).parentElement).parentElement);
    });

    var btnMore = $('.see-more');
    btnMore.click(function() {
        renderMoreProducts(datos);
    });

    var btnCart = $('.btn-cart');
    btnCart.click(addCart);
}

const getItem = item => {
    const producto = {
        title: item.querySelector('h1').textContent,
        price: item.querySelector('#price').textContent
    }

    localStorage.setItem('share', JSON.stringify(producto));
    window.location.href = 'share.html';
}

const renderProductsDetails = (datos, id) => {

    $.each(datos.meals, function(index, obj) {
        let details =
            `
        <div>
            <p><b>Categoria:</b> ${obj.strCategory}</p>
            <p><b>Area:</b> ${obj.strArea}</p>       
            <a href="${obj.strSource}" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/cooking-book.png"/></a>
            <a href="${obj.strYoutube}" target="_blank"><img src="https://img.icons8.com/color/50/000000/youtube-play.png"/></a>
        </div>
        `;
        Swal.fire({
            title: 'Detalles',
            icon: 'info',
            html: details
        })

    })
}