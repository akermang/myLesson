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

function addFile(fileToStore) {
    var storageRef = firebase.storage().ref();
    var filesRef = storageRef.child("files/" + fileToStore.fileName);
    var uploadFile = filesRef.put(fileToStore.file);
    var downloadURL;
    uploadFile.on(
        "state_changed",
        function (snapshot) { },
        function (error) { },
        function () {
            downloadURL = uploadFile.snapshot.downloadURL;
            insertFileUrlToNewLesson(downloadURL)
            let updates = {};
            let postData = {
                url: downloadURL,
                name: fileToStore.fileName,
            };
            firebase
                .database()
                .ref("files")
                .push(postData);
        }
    );
}

function deleteUser(id) {
    // storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteLesson() {
    var lessonsContainer = $("#lessons-container")[0];
    var selectedLesson = getSelectedLesson();
    selectedLesson.isDeleted = true;
    selectedLesson.student_ids = ["no isd"]

    storeInDb(selectedLesson, ALL_LESSONS_KEY + "/" + selectedLesson.id);
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
    $(".icon-update." + lesson.id).slideUp();
    domService.insertValuesToEditingElements(lessonContainer, lesson);
    setSelectedLesson(lesson);
}

