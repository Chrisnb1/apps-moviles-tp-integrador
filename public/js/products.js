
const urlByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const productsDiv = $('.products-div');

    
$(document).ready(function(){
    var category = localStorage.getItem('category');
    console.log(category);
    getXCategory(category);
});

const getXCategory = (category) => {
    $.ajax({
        url: urlByCategory + category,
        type: "GET",
        dataType: "json",
        success: function(datos){
            
            renderProducts(datos);
            
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProducts = (datos) => {
    
    $.each(datos.meals, function(index, obj){
        let product = 
        `
        <div class="card">
            <h1>${obj.strMeal}</h1>
            <p>${obj.idMeal}</p>
            <img src="${obj.strMealThumb}" alt="${obj.strMeal}">
            <button class="btn-details" id="${obj.idMeal}">Ver detalles</button>
        </div>
        `;
        $(product).appendTo(productsDiv);
    });

    var btnsDetails = $('.btn-details');
    
    btnsDetails.click(function (){
        var id = $(this).attr("id");
        console.log(id);
        getProductDetails(id);
        
    });
}

const getProductDetails = (id) => {
    $.ajax({
        url: urlProductDetails + id,
        type: "GET",
        dataType: "json",
        success: function(datos){
            renderProductsDetails(datos);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProductsDetails = (datos) => {
    console.log(datos);
}