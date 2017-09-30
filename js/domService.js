var domService = {

    getContentFromDomElementBySelector: function(container, domElementSelector) {
        var lesson = $(container);
        var domElement = lesson.find(domElementSelector)[0];
        var content = domElement.value;
        return content;    
    },

    insertValueToEditingElement: function(container,lesson){
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
        var inputsContent = {};
        inputsSelectors.forEach(function(selector) {
            var value = domService.getContentFromDomElementBySelector(container, selector);
            var name = selector.slice(1);
            name = name.replace('-', '_');
            name = name.replace('-','_');
            name.content = value;
            inputsContent[name] = value;    
        });
        return inputsContent;
    }
}