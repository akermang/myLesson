function checkStudentLogUserName(){
    var logUserName = document.getElementById("input-student-id").value;

    // returns student as object or null
    var auth = getStudentByUserName(logUserName);

    if(auth) {       
        localStorage.setItem("loggedInUser", JSON.stringify(auth)); 
        window.location = "home.html";    
    }else{
         $('#exampleModal').modal('show');
    }
}    

//input enter-key event will click the login-button,onlly if exist
var input = document.getElementById("input-student-id");

if(input){ 
    input.addEventListener("keyup", function(event){
        event.preventDefault();
        if (event.keyCode == 13){
            document.getElementById("login-button").click();
        }
    });
}