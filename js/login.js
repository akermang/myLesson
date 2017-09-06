function checkStudentLogId(){
    var logId = document.getElementById("input-student-id").value;

    // returns student object or null
    var auth = getStudentById(logId);    

    if(auth) {       
        localStorage.setItem("loggedInUser", JSON.stringify(auth)); 
        window.location = "home.html";    
    }else{
        alert('student does not exists motherfucker')
    }
    

}
