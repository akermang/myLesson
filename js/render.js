function renderLessons(type, lessons, selector){
    var container = document.querySelector(selector);
    if(!container) return;
    emptyElement(container);
    if(lessons.length == 0 && type != TEACHER){
        $(".no-lessons-message").show(); 
        $(".signOut-link").show();
        return
    }

    if(type === TEACHER) {
        $(".nav-wrap").show();
        $(".signOut-link").hide();               
    }else{
        $(".nav-container").hide();
        $(".signOut-link").show(); 
    }
    $(".btn-top").show()

    lessons.forEach(function(lesson, i) {
        var lessonContainer = createHtmlElement("div","lesson-container-" + lesson.id)
        var date = createHtmlElement("div", "date");
        var subject = createHtmlElement("span","subject content");
        var bottom = createHtmlElement("div", "bottom");
        var musicSheet = createSrcElement("img", lesson.music_sheet_url, "music-sheet content");
        var tutorial = createSrcElement("iframe", lesson.tutorial_url, "tutorial content");
        var video = createSrcElement("iframe", lesson.video_url, "video content");
        var info = createHtmlElement("div", "info content");
        
        musicSheet.addEventListener('click', musicSheetCliced.bind(this))
        tutorial.setAttribute('allowFullScreen', '');
        video.setAttribute('allowFullScreen', '')
        info.innerText = lesson.info;
        date.innerText = formatDate(lesson.date_created);
        subject.innerText = lesson.subject;

        date.appendChild(wrapEditedElement(subject, "input",lesson.subject, "subject-input"));
        lessonContainer.appendChild(date);
        lessonContainer.id = "lesson-container-" +  lesson.id;

        if(type === TEACHER) {
            var iconsContainer = createHtmlElement('div','icons-container icons-container' + lesson.id);
            var iconDelete = createHtmlElement('img', "icon-delete " + lesson.id);
            var iconUpdate = createHtmlElement('img', "icon-update " + lesson.id);
            var selectStudents = createHtmlElement('select', "select-sudents-for-lesson");
            
            selectStudents.setAttribute("id", "select-sudents-for-lesson"+ lesson.id);
            selectStudents.setAttribute("multiple", (this.checked) ? "multiple" : "");                            
            iconDelete.src = './assets/icon-delete-red.png';
            iconUpdate.src = './assets/icon_update.png';
            iconUpdate.addEventListener("click", onUpdateLesson.bind(this, lesson ,lessonContainer));
            iconDelete.addEventListener("click",deleteIconClicked.bind(this, lesson, lessonContainer));   
            iconsContainer.appendChild(iconUpdate);
            iconsContainer.appendChild(iconDelete);
            date.appendChild(iconsContainer); 
            bottom.appendChild(selectStudents);           
        }
        
        
            
        bottom.appendChild(wrapEditedElement(musicSheet, "input", lesson.music_sheet_url, "music-sheet-input"));
        bottom.appendChild(wrapEditedElement(tutorial, "input", lesson.tutorial_url, "tutorial-input"));
        bottom.appendChild(wrapEditedElement(video, "input",lesson.video_url, "video-input"));
        bottom.appendChild(wrapEditedElement(info, "textArea", lesson.info,"info-input"));    
        
        lessonContainer.appendChild(bottom);
        container.appendChild(lessonContainer);
        populateSelectStudents("select-sudents-for-lesson"+ lesson.id);
    });

}

function wrapEditedElement(domElement, editingElementTagName, value, editingClass){
    var wrapper = createHtmlElement("div", "editing-element-wrapper")
    var editingElement = createHtmlElement(editingElementTagName, "editing-element" + " " + editingClass) 
    var label = createHtmlElement("label", "text-info h6 text-capitalize" );

    label.innerText = domElement.classList[0];
    !domElement.classList.contains("subject") ? wrapper.appendChild(label) : null;

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
        wrapper.appendChild(previewButton);
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

function musicSheetCliced(e, img) {
    e.target.classList.toggle("resize")
}

function loadNew(){
    if(loggedInUser.type === "teacher"){
        let loader = $(".loader-donut")
        if(loader) loader.hide()
        $(".new-container").show()
        newLesson(loggedInUser.id, ".new-lessons-container");
    }else{
        window.location.replace("home#home")
    }   
}


function newLesson(studentId, selector){
   var container = document.querySelector(selector);
   if(!container) return;
   var subject = createHtmlElement("input", "new-subject form-control");
   var bottom = createHtmlElement("div", "new-bottom form-group");
   var musicSheet = createHtmlElement("input",  "new-music-sheet form-control");
   var tutorial = createHtmlElement("input", "new-tutorial form-control");
   var video = createHtmlElement("input", "new-video form-control");
   var info = createHtmlElement("textarea", "new-info form-control");
   var button = createHtmlElement("button", "new-button btn btn-block btn-info");

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
}

function addEditingButtons(lesson,lessonContainer){
    var buttonsContainer =  createHtmlElement("div", "editing-buttons-container");
    var cancelButton = createHtmlElement("button", "editing-cancel-button btn btn-info btn-md");
    var saveButton = createHtmlElement("button","editing-save-button btn btn-danger btn-md");
    
    cancelButton.innerText = "Cancel";
    saveButton.innerText = "Save";
   
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
    
    $(deleteIcon).slideDown();
    $(updateIcon).slideDown();
    removeChild(lessonContainer, editingButtonsContainer);

    if(musicSheet.src !== lesson.music_sheet_url) musicSheet.src = lesson.music_sheet_url;
    if(tutorial.src !== lesson.tutorial_url) tutorial.src = lesson.tutorial_url;
    if(video.src !== lesson.video_url) video.src = lesson.video_url;    
}

function onSaveEditing(lessonContainer, lesson){
    var inputsSelectors = [".subject-input", ".music-sheet-input", ".tutorial-input", ".video-input", ".info-input"];
    var studentsSelect = document.getElementById("select-sudents-for-lesson" + lesson.id);
    var selectedStudents = getStudentsFromSelect(studentsSelect.options);
    var inputsContent = getContent.getContentFromInputsBySelectors(lessonContainer, inputsSelectors);
    updateLessonToSelectedStudentsById(selectedStudents, lesson);
    dataService.updateEditedContentToLesson(lesson, inputsContent);
    renderEditedLesson(lessonContainer, lesson);
}

function updateLessonToSelectedStudentsById(selectedStudents, lesson){
    selectedStudents.forEach(function(id){
        var check = null;
        lesson.student_ids.forEach(function(_id){
            if(_id == id) check= 1;
        })
        if(check == null) lesson.student_ids.unshift(id)
    })
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
    
    $(deleteIcon).slideDown();
    $(updateIcon).slideDown();
    removeChild(lessonContainer, editingButtonsContainer);

    if(subject.innerText !== lesson.subject) subject.innerText = lesson.subject;
    if(musicSheet.src !== lesson.music_sheet_url) musicSheet.src = lesson.music_sheet_url;
    if(tutorial.src !== lesson.tutorial_url) tutorial.src = lesson.tutorial_url;
    if(video.src !== lesson.video_url) video.src = lesson.video_url;
    if(info.innerText !== lesson.info) info.innerText = lesson.info;
}

function deleteIconClicked(lesson,lessonContainer){
    setSelectedLesson(lesson);
    lessonContainer.style.background = "rgba(190, 190, 160, 0.76)";
    $('#lessonName')[0].innerText = lesson.subject;
    $('.modal-body')[0].innerText = `Delete it will permanently delete ${lesson.subject} !`;
    $('#exampleModal').modal('show');   
    $("#btn-cencel-delete").click(cenceleDelete.bind(this, lessonContainer));
    $("#btn-delete-lesson").click(deleteLesson);
}

function cenceleDelete(lessonContainer){
    $("#btn-delete-lesson").unbind();
    $("#btn-cencel-lesson").unbind();
}
