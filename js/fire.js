
 
  // FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "./home",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'https://work-force-management.herokuapp.com/#/about'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function (user){
  if(user){
    console.log("LOGED IN")
   window.location = "./home";
  }else {
    console.log("NOT LOGED IN")
  }
})