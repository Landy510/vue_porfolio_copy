import { FormTextareaPlugin } from 'bootstrap-vue';
import $ from 'jquery';
function ReadWebSiteWidth(value, direction){
    if(value>1024){
        let scale = (direction==='L')? -370 : 370;
        return scale;
    } else if(value<=1024 && value>768){
        let scale = (direction==='L')? -310 : 310;
        return scale;
    } else {
        let scale = (direction==='L')? -230 : 230;
        return scale;
    }
}




$(document).ready(function(){
    
    $('.scrollTop').click(function(e){
        $('html,body').animate({
            scrollTop:0
        }, 1000)
    })
    $(window).scroll(function(e){
        if($(this).scrollTop()>400){
            $('.scrollTop').fadeIn();
        } else {
            $('.scrollTop').fadeOut();
        }
    })
    
    
    
})