var domService = {

    getContentFromDomElementBySelector: function(lessonContainer, domElementSelector) {
        var lesson = $(lessonContainer);
        var domElement = lesson.find(domElementSelector)[0];
        var content = domElement.value;
        return content;    
    }

}

var getContent = {

    getContentFromInputsBySelectors: function(lessonContainer, inputsSelectors){
        var inputsContent = {};
        inputsSelectors.forEach(function(selector) {
            var value = domService.getContentFromDomElementBySelector(lessonContainer, selector);
            var name = selector.slice(1);
            name.content = value;
            inputsContent[name] = value; 
             console.log(inputsContent);
            
        }, this);
    }
}