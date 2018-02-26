let users_data = []
firebase.auth().onAuthStateChanged(function (user) {
    if (user) initiatData()
})
    
initiatData = ()=>{
    firebase.database().ref('users')
    .once('value')
    .then(snapshot=>{
        snapshot.forEach(function(childSnapshot) {
            users_data.push( childSnapshot.val())
        })
        console.log(users_data)
        populateSelectStudents("select-students");
        populateSelectStudents("delete-select-students");
    })
}

// function getLessons(){
//     var storedLessons = getItem(ALL_LESSONS_KEY);
//     return storeIfNull(storedLessons, lessonsMockData, ALL_LESSONS_KEY);
// };

function getStudends(){
    var storedStudents = getItem(ALL_STUDENTS_KEY);
    return users_data
};

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function storeInDb(data, key) {
    let Ref = firebase.database().ref(key);
    console.log("data to stor:", data)
    Ref.update(data)
    // localStorage.setItem(key, JSON.stringify(data));
}

// function storeIfNull(storedData, mockData, key) {
//     if(!storedData){
//         // storeInDb(mockData, key);
//         return mockData;
//     }
//     return storedData;
// }

function onAddLesson(e) {
  var lessonToStore = getAddLessonsValues();
  console.log(lessonToStore)
  addLesson(lessonToStore);
  window.location = "home.html";
}

function addLesson(lesson){
  lesson.id = uuidv1();
//   lessons.unshift(lesson);
  console.log(lesson)
  let lessonsRef = firebase.database().ref("lessons");
  lessonsRef.push(lesson)
  
//   storeInDb(lessons, ALL_LESSONS_KEY);
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

// function deleteLesson(){    
//     var allLessons = getLessons();
//     var lessonsContainer = $("#lessons-container")[0];
//     var selectedLesson = getSelectedLesson();

//     allLessons.forEach(function(element,i) {
//         if(element.id == selectedLesson.id){         
//             lessons.splice(i, 1);
//         }
//     });
//     storeInDb(lessons, ALL_LESSONS_KEY);
//     emptyElement(lessonsContainer);
//     resetSelectedLesson();
//     loadHome();    
// }

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

