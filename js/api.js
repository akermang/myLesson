let users_data = []
firebase.auth().onAuthStateChanged(function (user) {
    if (user) initiatData()
})

initiatData = () => {
    firebase.database().ref('users')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(function (childSnapshot) {
                if(!childSnapshot.val().isDeleted){
                    users_data.push(childSnapshot.val())
                }
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
    let storageRef = firebase.storage().ref();
    let filesRef = storageRef.child("files/" + (+new Date()) + fileToStore.fileName);
    let uploadFile = filesRef.put(fileToStore.file);
    let downloadURL;
    uploadFile.then((snapshot) => {
        const url = snapshot.downloadURL;
        insertFileUrlToNewLesson(url)
        // document.querySelector('#someImageTagID').src = url;
        let postData = {
            url: url,
            name: fileToStore.fileName,
        };
        firebase.database().ref("files").push(postData);
    }
    ).catch((error) => {
        console.error(error);
    });
}

function deleteUser(id) {
    // storeInDb(students, ALL_STUDENTS_KEY);
}

function deleteLesson() {
    let lessonsContainer = $("#lessons-container")[0];
    let selectedLesson = getSelectedLesson();
    selectedLesson.isDeleted = true;
    selectedLesson.student_ids = ["no isd"]

    storeInDb(selectedLesson, ALL_LESSONS_KEY + "/" + selectedLesson.id);
    resetSelectedLesson();
    initApp()
}

function onUpdateLesson(lesson, lessonContainer) {
    let hasClass = lessonContainer.classList.contains("editing");
    if (hasClass) {
    } else {
        lessonContainer.classList.add("editing");
        addEditingButtons(lesson, lessonContainer);
    }
    $(".icon-update." + lesson.id).slideUp();
    domService.insertValuesToEditingElements(lessonContainer, lesson);
    setSelectedLesson(lesson);
}

