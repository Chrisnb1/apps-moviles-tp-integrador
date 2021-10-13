import { renderProducts } from "./products.js";


const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';



$(document).ready(function(){
    searchByName();
    getAreas();
    searchByArea();
    var category = localStorage.getItem('category');
    $('.products-div').html(`<h2>Ultima Categoria vista: ${category}</h2>`);
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

