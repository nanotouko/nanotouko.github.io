let artStyle = [ 'lineart', 'flat', 'colored' ];
let canvasSize = [ 'head', 'bust', 'cowboy', 'full' ];

$(window).ready(function() {
    sessionStorage.getItem('artstyle') === null && sessionStorage.setItem('artstyle', 'lineart');
    sessionStorage.getItem('canvassize') === null && sessionStorage.setItem('canvassize', 'full');
    sessionStorage.getItem('background') === null && sessionStorage.setItem('background', 0);

    $('#img-micchan-' + sessionStorage.getItem('artstyle')).css('display', 'block');
    $('#btn-' + sessionStorage.getItem('artstyle')).addClass('active');

    $('#dynamic-canvas-size').addClass(sessionStorage.getItem('canvassize'));
    $('#btn-' + sessionStorage.getItem('canvassize')).addClass('active');

    if (sessionStorage.getItem('background') == 1) {
        $('#background').addClass('on');
        $('#btnToggle').addClass('active');
    }

    calculateFinalPrice();

    $('#btnGroup__style button').on('click', function() {
        $('#img-micchan-' + sessionStorage.getItem('artstyle')).attr('transition-style', 'wipe-out-up');
        let style = $(this).data('style');
        sessionStorage.setItem('artstyle', style);
        $('#img-micchan-' + style).attr('transition-style', 'wipe-in-up').css('display', 'block');

        artStyle.forEach(e => {
            $('#btn-' + e).removeClass('active');
        });

        $(this).addClass('active');
    });

    $('#btnGroup__size button').on('click', function() {
        let size = $(this).data('size');
        sessionStorage.setItem('canvassize', size);

        canvasSize.forEach(e => {
            $('#dynamic-canvas-size').removeClass(e);
            $('#btn-' + e).removeClass('active');
        });

        $('#dynamic-canvas-size').addClass(size);
        $(this).addClass('active');
    });

    $('#btnToggle').on('click', function() {
        $(this).toggleClass('active');
        $('#background').toggleClass('on');
        sessionStorage.getItem('background') == 0 ? sessionStorage.setItem('background', 1) : sessionStorage.setItem('background', 0);
    }); 

    $('.button-group button').on('click', function() { calculateFinalPrice(); })

    console.log(Boolean($('#btnToggle.active').length));
});

function calculateFinalPrice() {
    let finalPrice = $('#btnGroup__style .button.active').data('price')
        + $('#btnGroup__size .button.active').data('price')
        + ($('#btnToggle.active').length ? $('#btnToggle.active').data('price') : 0);
    $('#lblFinalPrice').html(finalPrice);
}