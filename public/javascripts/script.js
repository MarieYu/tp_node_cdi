jQuery(document).ready( function($) {

    $('#add-btn').click(function (e) {
        $('.add-form').css('display', 'inline-block');
    });

    $("#form-new").submit(function(e) {
        e.preventDefault();
        console.log("submit");
        var data = {};
        data.name = $('#title').val();
        data.type = $('input[name=type]:checked').val();
        data.recipe = $('#recipe').val();
        data.price = $('#price').val();
        console.log(data);
        $.ajax({
            'type': 'POST',
            'url': '/send',
            'data': data,
            'success': function(data) {
                console.log('success');
                console.log(data);
            }
        });
    });

});