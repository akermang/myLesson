
var studentLessons = getLessonsByStudentId(lessons, loggedInUser.id);
renderLessons(studentLessons, ".lessons-container");

var welcome = document.querySelector(".welcome-msg");
welcome.innerHTML = loggedInUser.first_name + " " + loggedInUser.last_name
