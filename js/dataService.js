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
        console.log(lesson)
    }
}















