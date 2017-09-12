function renderLessons(lessons, selector){
    var container = document.querySelector(selector);
    if(!container) return;

    lessons.forEach(function(lesson) {
        var date = createHtmlElement("div", "date");
        var bottom = createHtmlElement("div", "bottom");
        var musicSheet = createSrcElement("img", lesson.music_sheet_url, "music-sheet");
        var tutorial = createSrcElement("iframe", lesson.tutorial_url, "tutorial");
        var video = createSrcElement("iframe", lesson.video_url, "video");
        var info = createHtmlElement("div", "info");

        info.innerText = lesson.info;
        date.innerText = "Lesson : " + new Date(lesson.date_created);

        container.appendChild(date);
        bottom.appendChild(musicSheet);
        bottom.appendChild(tutorial);
        bottom.appendChild(video);
        bottom.appendChild(info);
        container.appendChild(bottom);
    });

}

function createHtmlElement(tagName, className){
    var element = document.createElement(tagName);
    element.setAttribute("class", className);
    return element;
}

function createSrcElement(tagName, src, className){
    var iframe = createHtmlElement(tagName, className);
    iframe.src = src;
    return iframe;
}

var welcome = document.querySelector(".welcome-msg");
if(welcome){
    welcome.innerHTML = `Hello..  ${loggedInUser.first_name} ${loggedInUser.last_name}`
}
function loadHome(){
    var studentLessons = getLessonsByStudentId(getLessons(), loggedInUser.id);
    renderLessons(studentLessons, ".lessons-container");
}

function loadNew(){

   newLesson(loggedInUser.id, ".new-lessons-container");
}


function newLesson(studentId, selector){
   var container = document.querySelector(selector);
   if(!container) return;
   var date = createHtmlElement("input", "new-date");
   var subject = createHtmlElement("input", "new-subject");
   var bottom = createHtmlElement("div", "new-bottom");
   var musicSheet = createHtmlElement("input",  "new-music-sheet");
   var tutorial = createHtmlElement("input", "new-tutorial");
   var video = createHtmlElement("input", "new-video");
   var info = createHtmlElement("textarea", "new-info");
   var button = createHtmlElement("button", "new-button");

   subject.value = "Subject";
   info.innerText = "write info here";
   date.value = new Date(new Date().getTime());
   musicSheet.value = "MusicSheet url";
   tutorial.value = "Tutorial url";
   video.value = "Video url";
   button.innerText = "save lesson";

   button.addEventListener('click', onAddLesson)

   container.appendChild(date);
   bottom.appendChild(subject);
   bottom.appendChild(musicSheet);
   bottom.appendChild(tutorial);
   bottom.appendChild(video);
   bottom.appendChild(info);
   bottom.appendChild(button);
   container.appendChild(bottom);

   populateSelectStudents();
}

function populateSelectStudents(){
   var select = document.getElementById("select-students");
   if(!select) return;
   students.forEach(function(student) {
    var option = createHtmlElement("option", "option-student");
    option.innerText = `${student.first_name} ${student.last_name}`;
    option.studentId = student.id;
    select.appendChild(option);
   });
}
