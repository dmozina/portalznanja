/**
 * Created with PyCharm.
 * User: David
 * Date: 28.4.2013
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    //get the current position of the active item
    var dleft = $('.menu li.active').offset().left - $('.menu').offset().left;
    var dwidth = $('.menu li.active').width() + "px";

    //apply the current position of active item to our floatr element
    $('.floatr').css({
        "left": dleft+"px",
        "width": dwidth
    });
    $('.menu li').hover(function(){

        var left = $(this).offset().left - ($(this).parents('.menu').offset().left + 15);
        var width = $(this).width() + "px";
        var sictranslate = "translate("+left+"px, 0px)";

        $(this).parent('ul').next('div.floatr').css({
            "width": width,
            "-webkit-transform": sictranslate,
            "-moz-transform": sictranslate
        });

    },
    function(){

            var left = $(this).siblings('li.active').offset().left - ($(this).parents('.menu').offset().left + 15);
            var width = $(this).siblings('li.active').width() + "px";

            var sictranslate = "translate("+left+"px, 0px)";

            $(this).parent('ul').next('div.floatr').css({
                "width": width,
                "-webkit-transform": sictranslate,
                "-moz-transform": sictranslate

            });

        }).click(function(){

            $(this).siblings('li').removeClass('active');

            $(this).addClass('active');

            return false;

        });

});