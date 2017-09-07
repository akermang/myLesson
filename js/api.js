function getLessons(){
    var storedLessons = localStorage.getItem("lessons_data");
    if(storedLessons == null){
        localStorage.setItem("lessons_data", JSON.stringify(lessonsMockData));
        return lessonsMockData;
    }
    return JSON.parse(storedLessons);
};


function getStudends(){
    var storedStudents = localStorage.getItem("students_data");
    if(storedStudents == null){
        localStorage.setItem("students_data", JSON.stringify(studentsMockData));
        return studentsMockData;
    }
    return JSON.parse(storedStudents);
};