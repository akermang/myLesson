var students = getStudends();
// var lessons = getLessons();

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

function getStudentByUserName(userName) {
    var student = students.filter(function(_student){
        return _student.username === userName;
    });
    if(student.length > 0) {
        return student[0]
    }else{
        return null;
    }
}

var dataService = {

    getStudentById: function(id) {
        return students.filter(function(student) {
            return student.id === id;
        })[0];
    },

    getTeacherById: function(id) {
        return teachers.filter(function(teacher) {
            return teacher.id === id;
        })[0];
    },

    updateEditedContentToLesson: function(lesson, content) {
        lesson.subject = content.subject_input;
        lesson.music_sheet_url = content.music_sheet_input;
        lesson.tutorial_url = content.tutorial_input;
        lesson.video_url = content.video_input;
        lesson.info = content.info_input;
        dataService.updateLessons(lesson);
    },

    updateLessons: function(lesson){
        // lessons.forEach(function(element, i) {
        //     if(element.id == lesson.id) lessons[i] = lesson;
        // });
        console.log("lesson to stor:", lesson)
       storeInDb(lesson, ALL_LESSONS_KEY +"/" + lesson.id);
    }
}

function populateSelectStudents(selector){
    var select = document.getElementById(selector);
    if(!select) return;
    students.forEach(function(student) {
     var option = createHtmlElement("option", "option-student text-success");
     option.innerText = `${student.displayName}`;
     option.studentId = student.uid;
     select.appendChild(option);
    });
 }
