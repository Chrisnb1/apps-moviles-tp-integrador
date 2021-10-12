const urlAllCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const products_index = $('.products-index');

$(document).ready(function() {
    getAllCategories();
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

