$(document).ready(function () {
    $(".hamburger").click(function () {
        $(".wrapper").toggleClass("active")
    })
});



$(document).ready(function () {
    var table = $('#example').DataTable({
        responsive: true,
        scrollX: true,
        ajax: {
            url: 'https://apis.cesoftcr.com/desa/v1/productos.php',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'producto' },
            { data: 'oferta' },
            { data: 'mjsoferta' },
            { data: 'cod_categoria' },
            { data: 'des_categoria' }
        ],
        pageLength: 10
    });    

    // Filtro por categoría
    $('#categoryFilter').keyup(function () {
        table.column(4).search($(this).val()).draw();
    });

    // Filtro por oferta N
    $('#offerN').change(function () {
        table.column(2).search(this.checked ? 'N' : '').draw();
    });

    // Filtro por oferta S
    $('#offerS').change(function () {
        table.column(2).search(this.checked ? 'S' : '').draw();
    });


// Llenar el dropdown con valores únicos de la columna 'des_categoria'
$.ajax({
    url: 'https://apis.cesoftcr.com/desa/v1/productos.php',
    dataType: 'json',
    success: function (data) {
        var uniqueCategories = [];
        $.each(data, function (index, item) {
            if ($.inArray(item.des_categoria, uniqueCategories) === -1) {
                uniqueCategories.push(item.des_categoria);
                $('#categorySelect').append($('<option>', {
                    value: item.des_categoria,
                    text: item.des_categoria
                }));
            }
        });
    }
});

// Filtro por categoría seleccionada en el dropdown
$('#categorySelect').on('change', function () {
    var categoria = $(this).val();
    table.column(5).search(categoria).draw();
});




});






