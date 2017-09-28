$(document).ready(function(e) {
    
    $("[class*=lesson-container]").click(myAmazingCallBack);

})

function myAmazingCallBack(e) {
    var element = e.currentTarget;    
    $(element).css('background', 'pink').siblings().css('background', 'inherit');
}