$(document).ready(function(e) {  
    $("[class *= icon-delete]").click(slideUp);
});


// function myAmazingCallBack(e) {
//     var element = e.currentTarget; 
//     $(element).css('background', 'rgba(114, 44, 44, 0.62)').siblings().css('background', 'inherit');
// }

function slideUp(e){
    var element = e.currentTarget;
    $(element).slideUp();
}

function slideDown(e){
    var element = e.currentTarget;
    $(element).slideDown();
}
