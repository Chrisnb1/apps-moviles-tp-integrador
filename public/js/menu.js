$(document).ready(main);

var count = 1;

function main() {
    // Cuando se da click en el boton menu
    $('.btn-menu').click(function() {
        // Aparece o desaparece el nav

        if (count == 1) {
            $('nav').animate({
                left: '0'

            });
            count = 0;
        } else {
            count = 1;
            $('nav').animate({
                left: '-100%',
            });
        }
    });
}