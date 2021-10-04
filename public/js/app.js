const urlAllCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const urlByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const main = $('.main');
const productsDiv = $('.products-div');
const loc = 'http://127.0.0.1:5500/html/products.html'

$(document).ready(function(){
    
    console.log(window.location.href)
    if (window.location.href == loc) {
        console.log('pagina de productos');
        
    }else{
        getAllCategories();
    }
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

/*
const getXCategory = (category) => {
    $.ajax({
        url: urlByCategory + category,
        type: "GET",
        dataType: "json",
        success: function(datos){
            //renderProducts(datos, category);
            renderProducts(datos)
            
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}
*/

const renderCategories = (datos) => {
    console.log(datos);
    $.each(datos.categories, function(index, obj){
        console.log(obj.strCategory);
        let category = 
        `
        <div class="category-${obj.strCategory}">
            <section>
                <h1 class="title">${obj.strCategory}</h1>
                <p class="id">${obj.idCategory}</p>
                <img src="${obj.strCategoryThumb}" alt="${obj.strCategory}">
                <p class="description">${obj.strCategoryDescription}</p>
                <button class="btn" id="${obj.strCategory}">Ver platos</button>
                
                <article class="products-${obj.strCategory}"></article>
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
        //window.location.href = 'products.html';
    });
    
}

const getXCategory = (category) => {
    $.ajax({
        url: urlByCategory + category,
        type: "GET",
        dataType: "json",
        success: function(datos){
            //renderProducts(datos, category);
            
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
        //let productsDiv = $('.products-'+category);
        $(product).appendTo(productsDiv);
    });
    window.location.href = 'products.html';
}

/*
export const renderProducts = (datos) => {
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
        return product;
        //let productsDiv = $('.products-'+category);
        //$(product).appendTo(productsDiv);
    });
}
*/


