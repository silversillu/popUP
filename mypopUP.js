$(document).ready(function(){

    $('[popUP]').each(function(){
        var el = $(this);
        var target = $(el.attr('popUP'));
        var closeButtonContent = '&times;';
        el.click(function(){
            $('#popUP').remove();
            $('body').append(
                '<div id="popUP" class="popUP">'+ 
                    '<div class="popUP-inner">'+
                        '<span class="popUP-close-button">' + closeButtonContent + '</span>'+
                        target[0].outerHTML + 
                    '</div>'+
                '</div>'
            );
            $('.popUP-close-button').click(function(){
                $('#popUP').remove();
            });
            $("#popUP").click(function(){
              $(this).remove();
            }).children().click(function(e) {
              return false;
            });
        });
    });

});

