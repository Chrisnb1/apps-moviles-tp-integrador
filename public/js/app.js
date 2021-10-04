const urlAllCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const urlByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const main = $('.main');

$(document).ready(function(){
        getAllCategories();
});


const getAllCategories = () => {
    $.ajax({
        url: urlAllCategories,
        type: "GET",
        dataType: "json",
        success: function(datos){
            renderCategories(datos);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderCategories = (datos) => {
    console.log(datos);
    $.each(datos.categories, function(index, obj){
        console.log(obj.strCategory);
        let category = 
        `
        <div class="category-div category-${obj.strCategory}">
            <section>
                <h1 class="title">${obj.strCategory}</h1>
                <p class="id">${obj.idCategory}</p>
                <img src="${obj.strCategoryThumb}" alt="${obj.strCategory}">
                <p class="description">${obj.strCategoryDescription}</p>
                <button class="btn" id="${obj.strCategory}">Ver platos</button>
                
                <div class="products products-${obj.strCategory}"></div>
            </section>
        </div>       
        `;
        $(category).appendTo(main);
        
    })
    
    var btns = $('.btn');
    
    btns.click(function (){
        var id = $(this).attr("id");
        console.log(id);
        getXCategory(id);
        
    });
    
}

const getXCategory = (category) => {
    $.ajax({
        url: urlByCategory + category,
        type: "GET",
        dataType: "json",
        success: function(datos){
            renderProducts(datos, category);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}


const renderProducts = (datos, category) => {
    console.log(datos);
    
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
        let productsDiv = $('.products-'+category);
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



