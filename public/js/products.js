const urlByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const productsDiv = $('.products-div');


$(document).ready(function() {
    var category = localStorage.getItem('category');
    console.log(category);
    getXCategory(category);
});

const getXCategory = (category) => {
    $.ajax({
        url: urlByCategory + category,
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
        $(product).appendTo(productsDiv);
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

const getProductDetails = (id) => {
    $.ajax({
        url: urlProductDetails + id,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            renderProductsDetails(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProductsDetails = (datos) => {
    console.log(datos);
}

const getItem = item => {
    const producto = {
        title: item.querySelector('h1').textContent,
        price: item.querySelector('p').textContent
    }

    localStorage.setItem('share', JSON.stringify(producto));
    window.location.href = 'share.html';
}