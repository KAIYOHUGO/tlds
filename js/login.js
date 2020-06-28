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
var UserConfig = {};
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

function login_write() {
  GoogleLogin().then(function() {
    window.location = "html/writeNote.html";
  });
}

function login_admin() {
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
      if (
        UserConfig.uid != "neOGGzZPrifCaxmOKUfNASqYQ6K2" &&
        UserConfig.uid != "qVgY1O8enqS5FSyQ8ozqehKGJge2"
      ) {
        alert("Deny");
      } else {
        window.location = "html/approveNote.html";
      }
      UserConfig.refreshToken = user.refreshToken;
      localStorage.setItem("pp354715", user.email);
      localStorage.setItem("pd354715", user.displayName);
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
      localStorage.setItem("pp354715", user.email);
      localStorage.setItem("pd354715", user.displayName);
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

function support() {
  var content = document.querySelector("#support_input").value;
  if (
    content.split(" ").join("") !== "\n" &&
    content.split(" ").join("") !== ""
  ) {
    firebase.functions().httpsCallable("support")({ context: content });
    document.querySelector("#support_input").value = "";
  } else {
    document.querySelector("#support_input").value = "";
    console.warn("don't send support with empty statment");
  }
}
