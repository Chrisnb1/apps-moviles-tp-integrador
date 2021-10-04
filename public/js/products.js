/*
const productsDiv = $('.products-div');

var btns = $('.btn');
    
btns.click(function (){
    var id = $(this).attr("id");
    console.log(id);
    getXCategory(id);
    window.location.href = 'products.html';
});

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
    
}
*/