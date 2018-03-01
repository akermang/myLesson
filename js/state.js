var studentLessons = []
var loggedInUser = {};
var state = {
    selectedLesson: {},
    isTeacher: loggedInUser.type === TEACHER,
    selectedLessonDomElement: ".lesson-container-" + this.selectedLesson,
    isModalRender: false
}

initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('users').child(user.uid)
                .once('value', function (snapshot) {
                    loggedInUser = snapshot.val()
                    loggedInUser.id = snapshot.key

                    firebase.database().ref('lessons')
                        .once('value')
                        .then(snapshot => {
                            let lessons_data = []
                            snapshot.forEach(function (childSnapshot) {
                                lessons_data.push(childSnapshot.val())
                            })

                            user.getIdToken().then(function (accessToken) {
                                if (window.location.hash === "#home") {
                                    loadHome(lessons_data)
                                }
                                return lessons_data
                            })

                        })
                })

            function loadHome(lessons_data) {
                var welcome = document.querySelector(".welcome-msg");
                if (welcome) {
                    welcome.innerHTML = `Hello..  ${loggedInUser.displayName}`
                }
                studentLessons = getLessonsByStudentId(lessons_data, loggedInUser.id);
                renderLessons(loggedInUser.type, studentLessons, ".lessons-container")
            }

            // User is signed in.
            let photoURL = user.photoURL ||
                "https://firebasestorage.googleapis.com/v0/b/mylesson-b224e.appspot.com/o/puppy%202.jpg?alt=media&token=f126c476-6407-4180-97f1-45a10a309b50"

        } else {
            window.location = "/index.html"
            // User is signed out.
        }
    }, function (error) {
        console.log(error);
    });
};

window.addEventListener('load', function () {
    initApp()
});

const signOut = () => firebase.auth().signOut().then(function () {
    window.location = "./index.html"
}, function (error) {
    console.error('Sign Out Error', error);
});

function setSelectedLesson(lesson) {
    state.selectedLesson = lesson;
}

function resetSelectedLesson() {
    state.selectedLesson = {};
}

function getSelectedLesson() {
    return state.selectedLesson;
}

function popup() {
    state.isModalRender = true;
}

function removePopup() {
    state.isModalRender = false;
}