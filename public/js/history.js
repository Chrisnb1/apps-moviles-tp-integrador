const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const productsDiv = $('.products-div');

Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
      if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
  }

$(document).ready(function() {
    //var historyList = localStorage.getItem('history');
    //console.log(historyList);
    //var history = localStorage.getItem('history');
    var historyList = localStorage.getArray('historyList');
    console.log(historyList);
    $.each(historyList, function(index, obj){
        getProductsById(obj);
    })

});



const getProductsById = (id) => {
    $.ajax({
        url: urlProductDetails + id,
        type: "GET",
        dataType: "json",
        success: function(datos){
            renderProductsById(datos);
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderProductsById = (datos) => {
    console.log(datos);
    $.each(datos.meals, function(index, obj){
        let product = 
        `
        <div class="card">
            <p>Tags: ${obj.strTags}</p>
            <h1>${obj.strMeal}</h1>
            <p>Area: ${obj.strArea}</p>
            <p>Categoria: ${obj.strCategory}</p>
            <p>$ <span id="price">1000</span></p>
            <img class"img-card" src="${obj.strMealThumb}" alt="${obj.strMeal}">
            <div class="icons-cards">
                <a href="${obj.strSource}" target="_blank">Receta</a>
                <a href="${obj.strYoutube}" target="_blank">Youtube</a>
            </div>
        </div>
        `;
        $(product).appendTo(productsDiv);
    });
}