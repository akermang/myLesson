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
        
        
        info.innerText = lesson.info;
        date.innerText = formatDate(lesson.date_created);
        subject.innerText = lesson.subject;
        iconDelete.src = './assets/icon-delete-red.png';
        iconUpdate.src = './assets/icon_update.png';
        iconUpdate.addEventListener("click", onUpdateLesson.bind(this, lesson ,lessonContainer));
        iconDelete.addEventListener("click",deleteIconClicked.bind(this, lesson, lessonContainer,i));
        
        date.appendChild(wrapEditedElement(subject, "input",lesson.subject, "subject-input"));
        date.appendChild(iconDelete);
        date.appendChild(iconUpdate);
        lessonContainer.appendChild(date);
        bottom.appendChild(wrapEditedElement(musicSheet, "input", lesson.music_sheet_url, "music-sheet-input"));
        bottom.appendChild(wrapEditedElement(tutorial, "input", lesson.tutorial_url, "tutorial-input"));
        bottom.appendChild(wrapEditedElement(video, "input",lesson.video_url, "video-input"));
        bottom.appendChild(wrapEditedElement(info, "textArea", lesson.info,"info-input"));

        
        lessonContainer.appendChild(bottom);
        container.appendChild(lessonContainer);
    });

}

function wrapEditedElement(domElement, editingElementTagName, value, editingClass){
    var wrapper = createHtmlElement("div", "editing-element-wrapper")
    var editingElement = createHtmlElement(editingElementTagName, "editing-element" + " " + editingClass) //document.createElement(editingElementTagName);
   
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

function addEditingButtons(lesson,lessonContainer){
    var buttonsContainer =  createHtmlElement("div", "editing-buttons-container");
    var cancelButton = createHtmlElement("button", "editing-cancel-button");
    var saveButton = createHtmlElement("button","editing-save-button");
    
    cancelButton.innerText = "cancel";
    saveButton.innerText = "save";
   
    cancelButton.addEventListener("click",onCancelEditing.bind(this,lessonContainer, lesson));
    saveButton.addEventListener("click",onSaveEditing.bind(this,lessonContainer,lesson));
   
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(cancelButton);
    lessonContainer.appendChild(buttonsContainer);
}

function onCancelEditing(lessonContainer, lesson){
    lessonContainer.classList.remove("editing");
    var lc = $(lessonContainer)
    var deleteIcon = lc.find(".icon-delete")[0];
    var updateIcon = lc.find(".icon-update")[0];
    var editingButtonsContainer = lc.find(".editing-buttons-container")[0];
    var musicSheet = lc.find(".music-sheet")[0];
    var tutorial = lc.find(".tutorial")[0];
    var video = lc.find(".video")[0];
    
    changeElementDisplayValue(updateIcon, "block");
    changeElementDisplayValue(deleteIcon, "block");
    removeChild(lessonContainer, editingButtonsContainer);

    if(musicSheet.src !== lesson.music_sheet_url) musicSheet.src = lesson.music_sheet_url;
    if(tutorial.src !== lesson.tutorial_url) tutorial.src = lesson.tutorial_url;
    if(video.src !== lesson.video_url) video.src = lesson.video_url;    
}

function onSaveEditing(lessonContainer, lesson){
    var inputsSelectors = [".subject-input", ".music-sheet-input", ".tutorial-input", ".video-input", ".info-input"];
    var inputsContent = getContent.getContentFromInputsBySelectors(lessonContainer, inputsSelectors);
    dataService.updateEditedContentToLesson(lesson, inputsContent);
    renderEditedLesson(lessonContainer, lesson);
}

function renderEditedLesson(lessonContainer, lesson){
    lessonContainer.classList.remove("editing");
    var lc = $(lessonContainer)
    var deleteIcon = lc.find(".icon-delete")[0];
    var updateIcon = lc.find(".icon-update")[0];
    var editingButtonsContainer = lc.find(".editing-buttons-container")[0];
    var subject = lc.find(".subject")[0];
    var musicSheet = lc.find(".music-sheet")[0];
    var tutorial = lc.find(".tutorial")[0];
    var video = lc.find(".video")[0];
    var info = lc.find(".info")[0];
    
    changeElementDisplayValue(updateIcon, "block");
    changeElementDisplayValue(deleteIcon, "block");
    removeChild(lessonContainer, editingButtonsContainer);

    if(subject.innerText !== lesson.subject) subject.innerText = lesson.subject;
    if(musicSheet.src !== lesson.music_sheet_url) musicSheet.src = lesson.music_sheet_url;
    if(tutorial.src !== lesson.tutorial_url) tutorial.src = lesson.tutorial_url;
    if(video.src !== lesson.video_url) video.src = lesson.video_url;
    if(info.innerText !== lesson.info) info.innerText = lesson.info;
}

function deleteIconClicked(lesson,lessonContainer, i){
    lessonContainer.style.background = "rgba(190, 190, 160, 0.76)";
    $('#exampleModal').modal('show');
    $("#btn-cencel-delete").click(cenceleDelete.bind(this, lessonContainer));
    $("#btn-delete-lesson").click(deleteLesson.bind(this, i, lesson));
}

function cenceleDelete(lessonContainer){
    lessonContainer.style.background = "rgba(58, 58, 58, 0.73)";
}
