function renderLessons(lessons, selector){
    var container = document.querySelector(selector);
    if(!container) return;

    lessons.forEach(function(lesson, i) {
        var lessonContainer = createHtmlElement("div","lesson-container"+i)
        var date = createHtmlElement("div", "date");
        var subject = createHtmlElement("span","subject content");
        var bottom = createHtmlElement("div", "bottom");
        var musicSheet = createSrcElement("img", lesson.music_sheet_url, "music-sheet content");
        var tutorial = createSrcElement("iframe", lesson.tutorial_url, "tutorial content");
        var video = createSrcElement("iframe", lesson.video_url, "video content");
        var info = createHtmlElement("div", "info content");
        var iconDelete = createHtmlElement('img', "icon-delete");
        var iconUpdate = createHtmlElement('img', "icon-update");
        
        
        lessonContainer.id = "lesson-container" + i;
        info.innerText = lesson.info;
        date.innerText = formatDate(lesson.date_created);
        subject.innerText = lesson.subject;
        iconDelete.src = './assets/icon-delete-red.png';
        iconUpdate.src = './assets/icon_update.png';
        iconUpdate.addEventListener("click", onUpdateLesson.bind(this, i,lessonContainer));
        iconDelete.addEventListener("click",deleteLesson.bind(this, i));
        
        date.appendChild(wrapEditedElement(subject, "input",lesson.subject));
        date.appendChild(iconDelete);
        date.appendChild(iconUpdate);
        lessonContainer.appendChild(date);
        bottom.appendChild(wrapEditedElement(musicSheet, "input", lesson.music_sheet_url));
        bottom.appendChild(wrapEditedElement(tutorial, "input", lesson.tutorial_url));
        bottom.appendChild(wrapEditedElement(video, "input",lesson.video_url));
        bottom.appendChild(wrapEditedElement(info, "textArea", lesson.info));

        
        lessonContainer.appendChild(bottom);
        container.appendChild(lessonContainer);
    });

}

function wrapEditedElement(domElement, editingElementTagName, value){
    var wrapper = createHtmlElement("div", "editing-element-wrapper")
    var editingElement = createHtmlElement(editingElementTagName, "editing-element") //document.createElement(editingElementTagName);
   
    wrapper.appendChild(domElement);
    editingElement.value = value;
    wrapper.appendChild(editingElement); 
    
    if(!domElement.classList.contains("subject") &&
        !domElement.classList.contains("info")){
            var previewButton = createHtmlElement("button", "editing-element-button");
            editingElement.addEventListener('keyup', function(event){
                event.preventDefault();
                if(event.keyCode == 13){
                previewButton.click();
                }
            });
        previewButton.innerText = "Preview";
        previewButton.addEventListener("click",editingPreview.bind(this,domElement, editingElement, value));
        wrapper.appendChild(previewButton)
    };
    return wrapper;
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
   info.placeholder = "info";
   musicSheet.placeholder = "MusicSheet url";
   tutorial.placeholder = "Tutorial url";
   video.placeholder = "Video url";
   button.innerText = "Save  lesson";

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

function addEditingButtons(index,lessonContainer){
    var buttonsContainer =  createHtmlElement("div", "editing-buttons-container");
    var cancelButton = createHtmlElement("button", "editing-cancel-button");
    var saveButton = createHtmlElement("button","editing-save-button");
    
    cancelButton.innerText = "cancel";
    saveButton.innerText = "save";
   
    cancelButton.addEventListener("click",onCancelEditing.bind(this,lessonContainer));
    saveButton.addEventListener("click",onSaveEditing.bind(this,lessonContainer));
   
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(cancelButton);
    lessonContainer.appendChild(buttonsContainer);
}

function onCancelEditing(lessonContainer){
    lessonContainer.classList.remove("editing");
    var lessonsContainer = document.getElementById("lessons-container");
    emptyElement(lessonsContainer);
    loadHome();
}

function onSaveEditing(lessonContainer){
    console.log(lessonContainer);
}
