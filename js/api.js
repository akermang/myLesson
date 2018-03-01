let users_data = []
firebase.auth().onAuthStateChanged(function (user) {
    if (user) initiatData()
})

initiatData = () => {
    firebase.database().ref('users')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(function (childSnapshot) {
                users_data.push(childSnapshot.val())
            })
            populateSelectStudents("select-students");
            populateSelectStudents("delete-select-students");
        })
}

function getStudends() {
    var storedStudents = getItem(ALL_STUDENTS_KEY);
    return users_data
};

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function storeInDb(data, key) {
    let Ref = firebase.database().ref(key);
    Ref.update(data)
}

function addLesson(lesson) {
    let lessonsRef = firebase.database().ref("lessons").push();
    lesson.id = lessonsRef.key
    lessonsRef.set(lesson)
}

function addUser(user) {
    user.id = uuidv1();
    students.unshift(user);
    // storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteUser(id) {
    allUsers = getStudends();

    allUsers.forEach(function (element, i) {
        if (element.id == id) {
            students.splice(i, 1);
        }
    });
    // storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteLesson() {

    var lessonsContainer = $("#lessons-container")[0];
    var selectedLesson = getSelectedLesson();
    selectedLesson.isDeleted = true;
    selectedLesson.student_ids = ["no isd"]


    storeInDb(selectedLesson, ALL_LESSONS_KEY + "/" + selectedLesson.id);
    emptyElement(lessonsContainer);
    resetSelectedLesson();
    initApp()
}

function onUpdateLesson(lesson, lessonContainer) {
    var hasClass = lessonContainer.classList.contains("editing");
    if (hasClass) {
    } else {
        lessonContainer.classList.add("editing");
        addEditingButtons(lesson, lessonContainer);
    }
    // var deleteIcon = $(lessonContainer).find(".icon-delete")[0];
    $(".icon-update." + lesson.id).slideUp();
    domService.insertValuesToEditingElements(lessonContainer, lesson);
    setSelectedLesson(lesson);
}

