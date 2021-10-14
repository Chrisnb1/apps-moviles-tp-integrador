// import { renderProducts } from './products.js'
const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const resultsDiv = $('.products-div');
const card = $('.card');

let name_repeat = '';
let area_repeat = '';

$(document).ready(function() {
    searchByName();
    getAreas();
    searchByArea();
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
    });

    var btnsDetails = $('.btn-details');

    btnsDetails.click(function() {
        var id = $(this).attr("id");
        console.log(id);
        getProductDetails(id);

    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e) {
        console.log(e.target.parentElement);
        getItem(e.target.parentElement);
    })

}