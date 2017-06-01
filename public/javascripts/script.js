jQuery(document).ready( function($) {



    $('#add-btn').click(function (e) {
        $('.add-form').css('display', 'inline-block');
    });

    $("#form-new").submit(function(e) {
        e.preventDefault();
        var data = {};
        data.name = $('#title').val();
        data.type = $('input[name=type]:checked').val();
        data.recipe = $('#recipe').val();
        data.price = $('#price').val();
        $.ajax({
            'type': 'POST',
            'url': '/send',
            'data': data,
            'success': function(data) {
                $("#list").append(
                    $("<div class='container'>" +
                        "<div class='recipe'>" +
                            "<div class='denomination'>" +
                                "<p class='title'>"+data.values["name"]+"</p>" +
                                "<div class='logo "+data.values["type"]+"'></div>" +
                            "</div>"+
                            "<ul id='ingr-ctn'></ul>"+
                        "</div>"+
                        "<div class='price'><p>"+data.values["price"]+" €</p></div>"+
                        "<div class='fct-btn'><a><img src='/images/modify.png'></a></div>"+
                    "</div>"));
                for(var ii=0; ii<data.values["recipe"].length; ii++){
                    $("#ingr-ctn").append($("<li>"+data.values["recipe"][ii]+"</li>"))
                }
            }
        });
    });
});