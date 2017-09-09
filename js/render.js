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