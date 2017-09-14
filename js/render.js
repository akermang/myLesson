function renderLessons(lessons, selector){
    var container = document.querySelector(selector);
    if(!container) return;

    lessons.forEach(function(lesson, i) {
        var lessonContainer = createHtmlElement("div","lesson-container"+i)
        var date = createHtmlElement("div", "date");
        var subject = createHtmlElement("span","subject");
        var bottom = createHtmlElement("div", "bottom");
        var musicSheet = createSrcElement("img", lesson.music_sheet_url, "music-sheet");
        var tutorial = createSrcElement("iframe", lesson.tutorial_url, "tutorial");
        var video = createSrcElement("iframe", lesson.video_url, "video");
        var info = createHtmlElement("div", "info");
        var iconDelete = createHtmlElement('img', "icon-delete");
        var iconUpdate = createHtmlElement('img', "icon-update");
        
        
        lessonContainer.id = "lesson-container" + i;
        info.innerText = lesson.info;
        date.innerText = formatDate(lesson.date_created);
        subject.innerText = lesson.subject;
        iconDelete.src = './assets/icon-delete-red.png';
        iconUpdate.src = './assets/icon_update.png';
        iconUpdate.addEventListener("click", updateLesson.bind(this, i));
        iconDelete.addEventListener("click",deleteLesson.bind(this, i));
        
        date.appendChild(subject);
        date.appendChild(iconDelete);
        date.appendChild(iconUpdate);
        lessonContainer.appendChild(date);
        bottom.appendChild(musicSheet);
        bottom.appendChild(tutorial);
        bottom.appendChild(video);
        bottom.appendChild(info);

        
        lessonContainer.appendChild(bottom);
        container.appendChild(lessonContainer);
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
   var subject = createHtmlElement("input", "new-subject");
   var bottom = createHtmlElement("div", "new-bottom");
   var musicSheet = createHtmlElement("input",  "new-music-sheet");
   var tutorial = createHtmlElement("input", "new-tutorial");
   var video = createHtmlElement("input", "new-video");
   var info = createHtmlElement("textarea", "new-info");
   var button = createHtmlElement("button", "new-button");

   subject.placeholder = "Subject";
   info.innerText = lesson.info;;
   musicSheet.placeholder = "MusicSheet url";
   tutorial.placeholder = "Tutorial url";
   video.placeholder = "Video url";
   button.innerText = "save lesson";

   button.addEventListener('click', onAddLesson)

   bottom.appendChild(subject);
   bottom.appendChild(musicSheet);
   bottom.appendChild(tutorial);
   bottom.appendChild(video);
   bottom.appendChild(info);
   bottom.appendChild(button);
   container.appendChild(bottom);

   populateSelectStudents("select-students");
}

function populateSelectStudents(selector){
   var select = document.getElementById(selector);
   if(!select) return;
   students.forEach(function(student) {
    var option = createHtmlElement("option", "option-student");
    option.innerText = `${student.first_name} ${student.last_name}`;
    option.studentId = student.id;
    select.appendChild(option);
   });
}

function createUpdateAreaForLesson(selector, lesson){
    var container = document.querySelector(selector);
    if(!container) return;
    var subject = createHtmlElement("input", "new-subject");
    var bottom = createHtmlElement("div", "new-bottom");
    var musicSheet = createHtmlElement("input",  "new-music-sheet");
    var tutorial = createHtmlElement("input", "new-tutorial");
    var video = createHtmlElement("input", "new-video");
    var info = createHtmlElement("textarea", "new-info");
    var button = createHtmlElement("button", "new-button");
 
    subject.value = lesson.subject;
    info.innerText = lesson.info;
    musicSheet.value =lesson.music_sheet_url;
    tutorial.value = lesson.tutorial_url;
    video.value = lesson.video_url;
    button.innerText = "save lesson";
 
    button.addEventListener('click', onAddLesson)
 
    bottom.appendChild(subject);
    bottom.appendChild(musicSheet);
    bottom.appendChild(tutorial);
    bottom.appendChild(video);
    bottom.appendChild(info);
    bottom.appendChild(button);
    container.appendChild(bottom);
}
 
 

