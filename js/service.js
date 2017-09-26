var students = getStudends();
var lessons = getLessons();
var loggedInUser = localStorage.getItem("loggedInUser");
loggedInUser = JSON.parse(loggedInUser);

function getLessonsByStudentId(lessons, studentId){
    var studentLessons = [];
    lessons.forEach(function(lesson) {
        var studentIds = lesson.student_ids;
        studentIds.forEach(function(_studentId){
            if(studentId == _studentId){
                studentLessons.push(lesson);
            }
        })
    });
    return studentLessons;
}

function getStudentById(id) {
    var student = students.filter(function(_student){
        return _student.id === id;
    });
    if(student.length > 0) {
        return student[0]
    }else{
        return null;
    }
}

function removeElementLastChild(element){
    element.removeChild(element.lastChild);
}

function emptyElement(element){
    while (element.hasChildNodes()){
         element.removeChild(element.lastChild) 
    }         
}

function emptyChildElementByClassName(element, className){
    var hasClass = element.classList.contains(className);
    if(hasClass){
        element.classList.remove(className);
    }
}

function changeElementDisplayValue(element, displayValue){
    element.style.display = displayValue;
}

function editingPreview(previewElement, ContentToPreview, value){
    console.log(previewElement);
    console.log(ContentToPreview.value);
    console.log(value);
    previewElement.src = ContentToPreview.value;
    previewElement.innerHTML = ContentToPreview.value;
}