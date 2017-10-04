if(window.location.hash === "#home") {
    loadHome()
}

function loadHome() {
    var studentLessons = getLessonsByStudentId(getLessons(), loggedInUser.id);
    renderLessons(studentLessons, ".lessons-container")
}