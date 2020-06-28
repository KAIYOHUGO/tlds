//after loaded, firebase.auth().currentUser

if (
  firebase.auth().currentUser == null ||
  firebase.auth().currentUser == undefined
) {
  window.location = "../index.html";
}
