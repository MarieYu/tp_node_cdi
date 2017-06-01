jQuery(document).ready( function($) {



    $('#add-btn').click(function (e) {
        $('.add-form').css('display', 'inline-block');
        $(':input', '#form-new')
            .not(':hidden')
            .not(':submit')
            .val('')
            .removeAttr('checked');
        $('#add-btn').css('display', 'none');
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
                var pizza = $(data.html);
                var btn = pizza.find(".suppr");
                console.log(btn);
                $("#list").prepend(pizza);
                btn.click(supprAction);

                //supression du formulaire après soumission
                $('.add-form').css('display', 'none');
                //réapparition du bouton ajouter pour apparition formulaire
                $('#add-btn').css('display', 'inline-block');
                //vider le formualire


                /*$("#list").append(
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
                }*/
            }
        });
    });

    $(".fct-btn .suppr").click(supprAction);

function supprAction(e){
    e.preventDefault();
    var elem = $(this);
    var id = elem.parent().find("input[type=hidden]").val();
    var plat = elem.parent().parent().parent().find("div[id="+id+"]");

    $.ajax({
        'type': 'GET',
        'url': '/pizza/remove/'+id,
        'success': function(data){
            plat.remove();
        }
    });
}

});