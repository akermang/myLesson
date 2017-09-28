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
    }
}


var student = dataService.getStudentById('001');
var teacher = dataService.getTeacherById('003');




















