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


var students = getStudends();
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

