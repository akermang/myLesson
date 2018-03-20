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
                .once('value')
                .then(snapshot => {
                    if (!snapshot.val()){
                        console.log("erroe: no user snapshot 1:",snapshot)
                        firebase.database().ref('users').child(user.uid)
                        .once('value')
                        .then(snapshot => {
                            if (!snapshot.val()){
                                console.log("error: no user snapshot 2:",snapshot)
                                $(".loader-donut").hide();
                            $(".signOut-link").show()
                            return}
                        })
                    }
                    console.log("loggedInUser = snapshot.val():",snapshot.val())
                    console.log("user:",user)
                    snapshot.val() ? loggedInUser = snapshot.val() : null;
                    loggedInUser.id = user.uid;
                    loggedInUser.displayName = user.displayName;


                    firebase.database().ref('lessons')
                        .once('value')
                        .then(snapshot => {
                            let lessons_data = []
                            snapshot.forEach(function (childSnapshot) {
                                lessons_data.unshift(childSnapshot.val())
                            })

                            user.getIdToken().then(function (accessToken) {
                                if (window.location.hash === "#home") {
                                    loadHome(lessons_data)
                                } else {
                                    if (window.location.pathname === "/myLesson/new.html" || "/new.html")  { //this to  work with github.io/MyLesson/..//
                                        loadNew()
                                    }
                                }
                                return lessons_data
                            })

                        })
                })

            function loadHome(lessons_data) {
                let loader = $(".loader-donut")
                if(loader) loader.hide()
                var welcome = document.querySelector(".welcome-msg");
                if (welcome) {
                    welcome.innerHTML = `Hello..  ${loggedInUser.displayName}`
                }
                studentLessons = getLessonsByStudentId(lessons_data, loggedInUser.id);
                let type = loggedInUser.type || "student";
                renderLessons(type, studentLessons, ".lessons-container")
            }

            // User is signed in.
            let photoURL = user.photoURL ||
                "https://firebasestorage.googleapis.com/v0/b/mylesson-b224e.appspot.com/o/puppy%202.jpg?alt=media&token=f126c476-6407-4180-97f1-45a10a309b50"

        } else {
            window.location = "/index.html"
            // User is signed out.
        }
    },

    function (error) {
        console.log(error);
    });
};

document.onreadystatechange = function (e) {
    if (document.readyState === 'complete') {
        initApp()
        //dom is ready, window.onload fires later
    }
};
window.onload = function (e) {
    //document.readyState will be complete, it's one of the requirements for the window.onload event to be fired
    //do stuff for when everything is loaded
};

window.addEventListener('load', function () {

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