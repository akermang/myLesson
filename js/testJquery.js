$(document).ready(function(e) {
    
    $("[class*=lesson-container]").click(myAmazingCallBack);

})

function myAmazingCallBack(e) {
    var element = e.currentTarget;    
    $(element).css('background', 'rgba(114, 44, 44, 0.62)').siblings().css('background', 'inherit');
}