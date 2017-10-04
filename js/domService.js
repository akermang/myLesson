var domService = {

    getContentFromChildElementBySelector: function(container, childSelector) {
        var parent = $(container);
        var child = parent.find(childSelector)[0];
        var content = child.value;
        return content;    
    },

    insertValuesToEditingElements: function(container,lesson){
        var con = $(container);
        var subjectInput =  con.find(".subject-input")[0];
        var musicSheetInput = con.find(".music-sheet-input")[0];
        var tutorialInput = con.find(".tutorial-input")[0];
        var videoInput =  con.find(".video-input")[0];
        var infoInput = con.find(".info-input")[0];

        subjectInput.value = lesson.subject;
        musicSheetInput.value  = lesson.music_sheet_url;
        tutorialInput.value  = lesson.tutorial_url;
        videoInput.value  = lesson.video_url;
        infoInput.value = lesson.info;
    }

}

var getContent = {

    getContentFromInputsBySelectors: function(container, inputsSelectors){
        var content = {};
        inputsSelectors.forEach(function(selector) {
            var value = domService.getContentFromChildElementBySelector(container, selector);
            var Key = selector.slice(1);
            Key = Key.replace('-', '_');
            Key = Key.replace('-','_');
            content[Key] = value;    
        });
        return content;
    }
}


function removeChild(parent, child){
    parent.removeChild(child);
}

function emptyElement(element){
    while (element.hasChildNodes()){
         element.removeChild(element.lastChild) 
    }         
}

function emptyChildElementByClassName(element, className){
    var hasClass = element.classList.contains(className);
    if(hasClass){
        element.classList.remove(className);
    }
}

function changeElementDisplayValue(element, displayValue){
    element.style.display = displayValue;
}

function editingPreview(previewElement, ContentToPreview, value){
        previewElement.src = ContentToPreview.value;
}

function onAddLesson(e) {
    var lessonToStore = getAddLessonsValues();
    addLesson(lessonToStore);
    window.location = "home.html";
}

function getAddLessonsValues() {
    var subject = document.getElementsByClassName("new-subject")[0];
    var musicSheet = document.getElementsByClassName("new-music-sheet")[0];
    var tutorial = document.getElementsByClassName("new-tutorial")[0];
    var video = document.getElementsByClassName("new-video")[0];
    var info = document.getElementsByClassName("new-info")[0];
    var studentsSelect = document.getElementById("select-students");
    var selectedStudents = getStudentsFromSelect(studentsSelect.options);

    return {
        date_created: new Date().getTime(),
        subject: subject.value,
        music_sheet_url: musicSheet.value,
        tutorial_url: tutorial.value,
        video_url: video.value,
        info: info.value,
        student_ids: selectedStudents
    }
}
  
function getStudentsFromSelect(options) {
    var optionsSelected = [];
    for(var i = 0; i < options.length; i++) {
        var option = options[i];
        if(option.selected) {
        optionsSelected.push(option.studentId);
        }
    }
    return optionsSelected;
}