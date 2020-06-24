//from https://github.com/firebase/firebaseui-web/blob/master/README.md

/**
 * @function
 * @param {string} URL - Redirect After login
 */
function loginFirebaseui(URL) {
  var uiConfig = {
    signInSuccessUrl: URL,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: "<your-tos-url>",
    customParameters: {
      prompt: "select_account"
    }
    /*,
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }*/
  };

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
}
