const urlByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const urlProductDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const productsDiv = $('.products-div');
const btnContainer = $('.btn-container');



// Arrays en LocalStorage
Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
      if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
  }
  
  Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.push(arrayItem);
    this.setItem(arrayName,JSON.stringify(existingArray));
  }

$(document).ready(function() {
    var category = localStorage.getItem('category');
    //console.log(category);
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
    
    $.each(datos.meals, function(index, obj){
        let product = 
        `
        <div class="card">
            <h1>${obj.strMeal}</h1>
            <h2 class="priceH2">$ <span id="price">1000</span></h2>
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

        if (index === 9) {
            let btnSeeMore = 
            `
            <a class="see-more"><img src="https://img.icons8.com/material-sharp/48/000000/plus--v1.png"/></a>
            `;
            $(btnSeeMore).appendTo(btnContainer);
            return false;
        }
    });

    var btnsDetails = $('.btn-details');
    
    btnsDetails.click(function (){
        var id = $(this).attr("id");
        console.log(id);
        var historyList = localStorage.getArray('historyList');
        
        if(historyList.includes(id)){
            console.log('Ya esta en el historial');
        }
        else {
            localStorage.pushArrayItem('historyList', id);
        }
        
        getProductDetails(id);
    });

    var btnsShare = $('.btn-share');
    btnsShare.click(function(e){
        console.log(((e.target.parentElement).parentElement).parentElement);
        getItem(((e.target.parentElement).parentElement).parentElement);
    });

    var btnMore = $('.see-more');
    btnMore.click(function(){
        renderMoreProducts(datos);
    });
}

const renderMoreProducts = (datos) => {
    $.each(datos.meals, function(index, obj){
        if (index > 9) {
            let product = 
            `
            <div class="card">
                <h1>${obj.strMeal}</h1>
                <p class="sub-title">$ <span id="price">1000</span></p>
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
            $('.see-more').hide();
        }
    });
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
            
            <a href="${obj.strSource}" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/cooking-book.png"/></a>
            <a href="${obj.strYoutube}" target="_blank"><img src="https://img.icons8.com/color/50/000000/youtube-play.png"/></a>
        </div>
        `;
        Swal.fire({
            title: 'Detalles',
            icon: 'info',
            html: details
        })
        
    })
}

export const getItem = item => {
    const producto = {
        title: item.querySelector('h1').textContent,
        price: item.querySelector('#price').textContent
    }

    localStorage.setItem('share', JSON.stringify(producto));
    window.location.href = 'share.html';
}