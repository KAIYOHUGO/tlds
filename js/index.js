$(function() {
  rm_loader();
});
const firebaseConfig = {
  apiKey: "AIzaSyAiZ-QVP5BDlYtMDyAhV_5uP7RBP4BDNOI",
  authDomain: "ming-bda64.firebaseapp.com",
  databaseURL: "https://ming-bda64.firebaseio.com",
  projectId: "ming-bda64",
  storageBucket: "ming-bda64.appspot.com",
  messagingSenderId: "914389837231",
  appId: "1:914389837231:web:9f833410dc144a45e8fb5a",
  measurementId: "G-WL76FLC0HE"
};

var fire = firebase.initializeApp(firebaseConfig);
/**
 * @function
 * @name login_read
 */
function login_read() {
  GoogleLogin().then(function() {
    window.location = "html/readNote.html";
  });
}

var UserConfig = {};
function GoogleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    Login_hint: "google",
    prompt: "select_account"
  });
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      //console.log(user);//user data
      UserConfig.displayName = user.displayName;
      UserConfig.email = user.email;
      UserConfig.photo = user.photoURL;
      UserConfig.uid = user.uid;
      UserConfig.refreshToken = user.refreshToken;
    });
}

/**
 * send help to the support.
 * @function
 * @name support
 * @param {object} - data send to the firebase functions
 *      @member context {string} - context
 * @returns {error} - It always return an error
 * @example
 *  support({context:"It's very laggly"});
 */
//var support = firebase.functions().httpsCallable("support");
