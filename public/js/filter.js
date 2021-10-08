const urlSearchByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlGetAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlGetByAreas = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const resultsDiv = $('.results');

$(document).ready(function(){
    searchByName();
    getAreas();
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
            renderByName(datos);
        },
        error: function(xhr, status, error){
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