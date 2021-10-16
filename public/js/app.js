const urlAllCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const products_index = $('.products-index');

$(document).ready(function() {
    getAllCategories();
    getRandomMeals();

    // Mapa
var myMap = L.map('mapId').setView([-34.936760000,-57.936340000], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);
var marker = L.marker([-34.936760000,-57.936340000]).addTo(myMap);
marker.bindPopup("<b>Nuestras Oficinas!</b><br>Catedral de La Plata.").openPopup();
});


const getAllCategories = () => {
    $.ajax({
        url: urlAllCategories,
        type: "GET",
        dataType: "json",
        success: function(datos) {
            renderCategories(datos);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const renderCategories = (datos) => {
    console.log(datos);
    $.each(datos.categories, function(index, obj) {
        console.log(obj.strCategory);

        let category =
            `
        <div class="card">
            <h1 class="card-title">${obj.strCategory}</h1>
            <img src="${obj.strCategoryThumb}" alt="${obj.strCategory}">
            <p class="card-description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Sunt voluptate, cumque molestiae autem nisi enim aspernatur esse id animi earum. 
                Fugiat aspernatur maxime at expedita voluptas ad recusandae quas necessitatibus.
            </p>
            <button class="btn-product" id="${obj.strCategory}">Ver Platos</button>
        </div>
        `;
        $(category).appendTo(products_index);

    })

    var btns = $('.btn-product');

    btns.click(function() {
        var id = $(this).attr("id");
        console.log(id);
        localStorage.setItem('category', id);
        window.location.href = 'products.html';

    });

}

// Sector de publicidad

const urlRandomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';

const publicityDiv = $('.publicity-container');

const getRandomMeals = () => {
    for (let index = 0; index < 5; index++) {
        $.ajax({
            url: urlRandomMeal,
            type: "GET",
            dataType: "json",
            success: function(datos) {
                renderRandomMeal(datos);
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        })
        
    }
}

const renderRandomMeal = (datos) => {
    $.each(datos.meals, function(index, obj){
        let product = 
        `
        <div class="card">
            <p><b>Tags:</b> <span class="sub-title"> ${obj.strTags}</span></p>
            <h1 class="title">${obj.strMeal}</h1>
            <p><b>Area:</b> <span class="sub-title"> ${obj.strArea}</span></p>
            <p><b>Categoria:</b> <span class="sub-title"> ${obj.strCategory}</span></p>
            <img class"img-card" src="${obj.strMealThumb}" alt="${obj.strMeal}">
            <div class="icons-cards">
                <a href="${obj.strSource}" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/cooking-book.png"/></a>
                <a href="${obj.strYoutube}" target="_blank"><img src="https://img.icons8.com/color/50/000000/youtube-play.png"/></a>
            </div>
        </div>
        `;
        $(product).appendTo(publicityDiv);
    });
}
