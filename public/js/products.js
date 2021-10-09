
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
            <button class="btn-share" id="share-${obj.idMeal}">Compartir</button>
            <div class="details-div" id="details-${obj.idMeal}"></div>
        </div>
        `;
        $(product).appendTo(productsDiv);
    });

    var btnsDetails = $('.btn-details');
    
    btnsDetails.click(function (e){
        var id = $(this).attr("id");
        console.log(id);
        getProductDetails(id);
    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e){
        console.log(e.target.parentElement);
        getItem(e.target.parentElement);
    })
}

const getProductDetails = (id) => {
    $.ajax({
        url: urlProductDetails + id,
        type: "GET",
        dataType: "json",
        success: function(datos){
            renderProductsDetails(datos, id);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProductsDetails = (datos, id) => {
    
    $.each(datos.meals, function(index, obj){
        let details = 
        `
        <div>
            <h3>Tags: ${obj.strTags}</h3>
            <p>Area: ${obj.strArea}</p> 
            <a href="${obj.strSource}" target="_blank">Receta</a>
            <a href="${obj.strYoutube}" target="_blank">Youtube</a>
        </div>
        `;
        let detailsDiv = $('#details-'+ id);
        $(details).appendTo(detailsDiv);
        
    })
}

const getItem = item => {
    const producto = {
        title: item.querySelector('h1').textContent,
        price: item.querySelector('p').textContent
    }

    localStorage.setItem('share', JSON.stringify(producto));
    window.location.href = 'share.html';
}