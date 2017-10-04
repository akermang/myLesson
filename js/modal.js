$('#exampleModal').on('hide.bs.modal', function () {
    var id = state.selectedLesson.id;
    $(".icon-delete." + id).slideDown();
    $(".icon-update." + id).slideDown();
})