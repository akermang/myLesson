$(document).ready(function(e) {
    
 // $("[class*=lesson-container]").click(myAmazingCallBack);

    $("[class *= icon-update]").click(slideUp);
  
    $("[class *= lesson-container]").click(slideDown);
});


function myAmazingCallBack(e) {
    var element = e.currentTarget; 
    $(element).css('background', 'rgba(114, 44, 44, 0.62)').siblings().css('background', 'inherit');
}

function slideUp(e){
    var element = e.currentTarget;
    $(element).slideUp().siblings().slideDown();
}

function slideDown(e){
    var element = e.currentTarget;
    $(element).slideDown();
}