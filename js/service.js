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
