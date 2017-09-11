function onAddLesson(e) {
  var lessonToStore = getAddLessonsValues();
  addLesson(lessonToStore);
  window.location = "home.html";
}

function getAddLessonsValues() {
  var date = document.getElementsByClassName("new-date")[0];
  var subject = document.getElementsByClassName("new-subject")[0];
  var musicSheet = document.getElementsByClassName("new-music-sheet")[0];
  var tutorial = document.getElementsByClassName("new-tutorial")[0];
  var video = document.getElementsByClassName("new-video")[0];
  var info = document.getElementsByClassName("new-info")[0];
  var studentsSelect = document.getElementById("select-students");
  var selectedStudents = getStudentsFromSelect(studentsSelect.options);

  return {
    date: date.value,
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
