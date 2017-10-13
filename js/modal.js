$('#exampleModal').on('hide.bs.modal', function () {
    var id = state.selectedLesson.id;
    $(".icon-delete." + id).slideDown();
    $(".lesson-container-" + id).css("background", "rgba(58, 58, 58, 0.73)" );
})