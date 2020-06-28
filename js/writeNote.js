UserConfig = {
  photo: localStorage.getItem("pp354715"),
  displayName: localStorage.getItem("pd354715")
};

//init again(no need to login again)
var firebaseConfig = {
  apiKey: "AIzaSyAiZ-QVP5BDlYtMDyAhV_5uP7RBP4BDNOI",
  authDomain: "ming-bda64.firebaseapp.com",
  databaseURL: "https://ming-bda64.firebaseio.com",
  projectId: "ming-bda64",
  storageBucket: "ming-bda64.appspot.com",
  messagingSenderId: "914389837231",
  appId: "1:914389837231:web:9f833410dc144a45e8fb5a",
  measurementId: "G-WL76FLC0HE"
};
var fire;
var storage;
var storageRef;

var ph1s = null;
var ph2s = null;
var ph3s = null;
var ph4s = null;
//init again(no need to login again)
var firebaseConfig = {
  apiKey: "AIzaSyAiZ-QVP5BDlYtMDyAhV_5uP7RBP4BDNOI",
  authDomain: "ming-bda64.firebaseapp.com",
  databaseURL: "https://ming-bda64.firebaseio.com",
  projectId: "ming-bda64",
  storageBucket: "ming-bda64.appspot.com",
  messagingSenderId: "914389837231",
  appId: "1:914389837231:web:9f833410dc144a45e8fb5a",
  measurementId: "G-WL76FLC0HE"
};
document.addEventListener("DOMContentLoaded", function() {
  fire = firebase.initializeApp(firebaseConfig);
  //if (
  //  firebase.auth().currentUser == null ||
  //  firebase.auth().currentUser == undefined
  //) {
  //  window.location = "../index.html";
  //}
  storage = firebase.storage();
  storageRef = storage.ref();
  console.log("loaded!");
  console.log(firebase.database());
});

function gen_preview() {
  document.querySelector("#pre-content").innerHTML = document.querySelector(
    "#content"
  ).value;

  for (var w = 0; w < 4; w++) {
    if (document.querySelector("#photo" + (w + 1)).files[0] == null) {
      continue;
    }
    var reader = new FileReader();
    var inp_fun = new Function(
      "event",
      'document.querySelector("#pre-photo"+(' +
        w +
        "+1)).src = event.target.result;"
    );
    reader.addEventListener("load", inp_fun);
    reader.readAsDataURL(document.querySelector("#photo" + (w + 1)).files[0]);
    inp_fun = new Function(
      "x",
      `
                var ratio=(window.outerWidth/2)/document.querySelector("#pre-photo"+(${w}+1)).width;
                document.querySelector("#pre-photo"+(${w}+1)).width*=ratio;
                `
    );
    setTimeout(inp_fun, 400);
  }
}

function gen_ran() {
  var re = "A";
  for (var r = 0; r < 9; r++) {
    re += Math.floor(Math.random() * 10);
  }
  return re;
}

function up_load_t() {
  //new
  if (document.querySelector("#term-ap").checked) {
    FileList.prototype.forEach = Array.prototype.forEach;
    var img_arr = [];
    document.querySelector("#photo").files.forEach(function(ele) {
      var current_path = "/image/" + gen_ran();
      img_arr.push(current_path);
      PushFile(current_path, ele);
    });
    //img_arr.join("%*@");
    var AddNote = firebase.functions().httpsCallable("addNote");

    AddNote({
      text: document.querySelector("#introduce").value,
      content: document.querySelector("#content").value,
      picture: UserConfig.photo,
      displayName: UserConfig.displayName,
      image: img_arr.join("%*@"),
      subject: document
        .querySelector("#sort")
        .value.split(" ")
        .join("/")
    });
    window.location = "/../html/appreciate.html";
  } else {
    alert("請同意條款。");
  }
}

function b() {
  document.querySelector("#term").setAttribute("style", "");
}
function c() {
  document.querySelector("#term").setAttribute("style", "display:none");
}

function log_out() {
  firebase.auth().signOut();
  window.location = "../index.html";
}
