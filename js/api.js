function getLessons(){
    var storedLessons = getItem(ALL_LESSONS_KEY);
    return storeIfNull(storedLessons, lessonsMockData, ALL_LESSONS_KEY);
};

function getStudends(){
    var storedStudents = getItem(ALL_STUDENTS_KEY);
    return storeIfNull(storedStudents, users, ALL_STUDENTS_KEY);
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

function onAddLesson(e) {
  var lessonToStore = getAddLessonsValues();
  addLesson(lessonToStore);
  window.location = "home.html";
}

function addLesson(lesson){
  lesson.id = uuidv1();
  lessons.unshift(lesson);
  storeInDb(lessons, ALL_LESSONS_KEY);
}

function addUser(user){
    user.id = uuidv1();
    students.unshift(user);
    storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteUser(id){
    allUsers= getStudends();
    
    allUsers.forEach(function(element, i){
        if(element.id == id){
            students.splice(i, 1);
        }
    });
    storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteLesson(){    
    var allLessons = getLessons();
    var lessonsContainer = $("#lessons-container")[0];
    var selectedLesson = getSelectedLesson();

    allLessons.forEach(function(element,i) {
        if(element.id == selectedLesson.id){         
            lessons.splice(i, 1);
        }
    });
    storeInDb(lessons, ALL_LESSONS_KEY);
    emptyElement(lessonsContainer);
    resetSelectedLesson();
    loadHome();    
}

function onUpdateLesson(lesson ,lessonContainer){
    var hasClass = lessonContainer.classList.contains("editing");
    if(hasClass){
    }else{
        lessonContainer.classList.add("editing");
        addEditingButtons(lesson, lessonContainer);  
    }
    var deleteIcon = $(lessonContainer).find(".icon-delete")[0];
    $(".icon-update." + lesson.id).slideUp();
    domService.insertValuesToEditingElements(lessonContainer, lesson);    
    setSelectedLesson(lesson); 
}

