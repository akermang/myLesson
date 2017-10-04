var loggedInUser = localStorage.getItem("loggedInUser");
loggedInUser = JSON.parse(loggedInUser) || {};

var state = {
    selectedLesson: {},
    isTeacher: loggedInUser.type === TEACHER,
    selectedLessonDomElement: ".lesson-container-" + this.selectedLesson, 
    isModalRender: false
}

function setSelectedLesson(lesson) {
    state.selectedLesson = lesson;
}

function resetSelectedLesson() {
    state.selectedLesson = {};
}

function getSelectedLesson() {
    return state.selectedLesson;
}

function popup() {
    state.isModalRender = true;
}

function removePopup() {
    state.isModalRender = false;
}