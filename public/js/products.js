
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
    console.log(datos);
    
    $.each(datos.meals, function(index, obj){
        let product = 
        `
        <article>
            <h1>${obj.strMeal}</h1>
            <p>${obj.idMeal}</p>
            <img src="${obj.strMealThumb}" alt="${obj.strMeal}">
        </article>
        `;
        
        $(product).appendTo(productsDiv);
    });
    
}
