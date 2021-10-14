/*
import { getProductDetails, getItem, renderMoreProducts } from './products.js'

const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const resultsDiv = $('.products-div');
const card = $('.card');
const btnContainer = $('.btn-container');

let name_repeat = '';
let area_repeat = '';

$(document).ready(function() {
    searchByName();
    getAreas();
    searchByArea();
    resultsDiv.empty();
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
            renderByArea(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderByName = (datos) => {
    console.log(datos);
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
    // $('#search-by-area').submit(function(event) {
    $('.btn-search').click(function(event) {
        event.preventDefault();
        let area = $('#area').val();

        if (area === '' || area === area_repeat) {
            return;
        }
        card.remove();
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
            renderByArea(datos);
            // renderProducts(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderByArea = (datos) => {
    resultsDiv.empty();
    $.each(datos.meals, function(index, obj) {
        let product =
            `
            <div class="card">
                <h1>${obj.strMeal}</h1>
                <p>$ <span id="price">1000</span></p>
                <img class"img-card" src="${obj.strMealThumb}" alt="${obj.strMeal}">
                <div class"icons-cards">
                    <button class="btn-details btn-product" id="${obj.idMeal}"><span class="material-icons-outlined">
                    view_list
                    </span></button>
                    <button class="btn-share btn-product" id="share-${obj.idMeal}"><span class="material-icons-outlined">
                    share
                    </span></button>
                </div>
                
            </div>
            `;
        $(product).appendTo(resultsDiv).show(1000);
        if (index === 9) {
            let btnSeeMore = 
            `
            <button class="see-more">Ver Mas</button>
            `;
            $(btnSeeMore).appendTo(btnContainer);
            return false;
        }
    });

    var btnsDetails = $('.btn-details');

    btnsDetails.click(function() {
        var id = $(this).attr("id");
        console.log(id);
        localStorage.pushArrayItem('historyList', id);
        getProductDetails(id);

    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e) {
        console.log(e.target.parentElement);
        getItem(e.target.parentElement);
    });

    var btnMore = $('.see-more');
    btnMore.click(function(){
        renderMoreProducts(datos);
    });

}
*/


// Codigo anterior

import { renderProducts } from "./products.js";


const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

let name_repeat = '';
let area_repeat = '';
const card = $('.card');


$(document).ready(function(){
    searchByName();
    getAreas();
    searchByArea();
    //var category = localStorage.getItem('category');
    //$('.product-image').html(`<h2 class="sub-title">Ultima Categoria vista: ${category}</h2>`);
    //var lastCategory = `<h2 class="sub-title">Ultima Categoria vista: ${category}</h2>`;
    var productsDiv = `<div class="products-div"></div>`;
    var btnContainer = `<div class="btn-container"></div>`;
    $(productsDiv).appendTo($('.product-image'));
    $(btnContainer).appendTo($('.product-image'));
});

const searchByName = () => {
    
    $('#search-by-name').submit(function(event){
        event.preventDefault();
        let name = $('#name').val();
        getProductsByName(name);
    })

}

const getProductsByName = (name) => {
    console.log(name);
    $.ajax({
        url: urlSearchByName + name,
        type: "GET",
        dataType: "json",
        success: function(datos){
            $('.products-div').html("");
            $('.btn-container').html("");
            if (datos.meals === null) {
                swal({
                    title: "Error",
                    text: "No se encontro el plato que busco!!!",
                    icon: "error"
                })
            } else {
                renderProducts(datos);
            }
        },
        error: function(xhr, status, error){
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
        success: function(datos){
            mostrarAreas(datos);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const mostrarAreas = (datos) => {
    $.each(datos.meals, function(index, obj){
        
        $(`<option value="${obj.strArea}">${obj.strArea}</option>`).appendTo($('#area'));
    })
}

const searchByArea = () => {
    
    $('#search-by-area').submit(function(event){
        event.preventDefault();
        let area = $('#area').val();
        getByArea(area);
    })
    
}

const getByArea = (area) => {
    $.ajax({
        url: urlGetByAreas + area,
        type: "GET",
        dataType: "json",
        success: function(datos){
            $('.products-div').html("");
            renderProducts(datos);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}


