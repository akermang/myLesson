$(document).ready(function(e) {
    
    $("[class*=lesson-container]").click(myAmazingCallBack);

})

function myAmazingCallBack(e) {
    var element = e.currentTarget;    
    $(element).css('background', 'rgba(255, 235, 59, 0.29)').siblings().css('background', 'inherit');
}