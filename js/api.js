const ALL_LESSONS_KEY = "lessons_data";
const ALL_STUDENTS_KEY = "students_data";

function getLessons(){
    var storedLessons = getItem(ALL_LESSONS_KEY);
    return storeIfNull(storedLessons, lessonsMockData, ALL_LESSONS_KEY);
};

function getStudends(){
    var storedStudents = getItem(ALL_STUDENTS_KEY);
    return storeIfNull(storedStudents, studentsMockData, ALL_STUDENTS_KEY);
};

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function storeInDb(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
}

function storeIfNull(storedData, mockData, key) {
    if(!storedData){
        storeInDb(mockData, key);
        return mockData;
    }
    return storedData;
}

function addLesson(lesson){
  lessons.unshift(lesson);
  storeInDb(lessons, ALL_LESSONS_KEY);
}

function deleteLesson(lesson){
    $('#exampleModal').modal('hide');
    var allLessons = getLessons();
    console.log(lesson.id);

    allLessons.forEach(function(element,i) {
        if(element.id == lesson.id){
            console.log(element);
            lessons.splice(i, 1);
        }
    }); 

    storeInDb(lessons, ALL_LESSONS_KEY);
    var lessonsContainer = document.getElementById("lessons-container");
    emptyElement(lessonsContainer);
    loadHome();
}

function onUpdateLesson(lesson ,lessonContainer){
    var hasClass = lessonContainer.classList.contains("editing");
    if(hasClass){
       // lessonContainer.classList.remove("editing");
        //removeElementLastChild(lessonContainer);
    }else{
        lessonContainer.classList.add("editing");
        addEditingButtons(lesson, lessonContainer);  
    }
    var deleteIcon = $(lessonContainer).find(".icon-delete")[0];
    $(deleteIcon).slideUp();
    domService.insertValueToEditingElement(lessonContainer, lesson);     
}

