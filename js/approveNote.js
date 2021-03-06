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
var last_search = [];
var ran_id = 0;
var last_notes;
var pre_app;
var storage;
var storageRef;
var fire;
document.addEventListener("DOMContentLoaded", function() {
  fire = firebase.initializeApp(firebaseConfig);
  storage = firebase.storage();
  storageRef = storage.ref();
  console.log("loaded!");
  console.log(firebase.database());
  var note_get = new data_requester("/note", "timeStamp");
  note_get.once().then(function(input) {
    var note_arr = input.filter(x => x.approved != "true");
    //admin filter
    last_notes = note_arr;
    Back_search([]);
  });
  /*
  if (
    firebase.auth().currentUser == null ||
    firebase.auth().currentUser == undefined
  ) {
    window.location = "../index.html";
  }*/
});

/**
 * @function
 * @name Back_search
 * @param {string[]} array_fi
 */
function Back_search(array_fi) {
  document.querySelector("#loading").setAttribute("style", "");
  document.querySelector("#top").setAttribute("style", "display:none;");
  document.querySelector("#content").setAttribute("style", "display:none;");
  document.querySelector("#search").setAttribute("style", "display:none;");
  array_fi = array_fi.map(function(x) {
    return new Function("x", "return (new RegExp('" + x + "').test(x));");
  });
  function test_al(x) {
    for (var t = 0; t < array_fi.length; t++) {
      if (!array_fi[t](x)) {
        return false;
        //break;
      }
    }
    return true;
  }
  var now_a = last_notes.filter(x => test_al(x.subject));
  pre_app = document.createElement("div");
  now_a.forEach(function(x) {
    var author_uid = x.uid;
    var author_photo = x.picture; //url
    var author_name = x.displayName;
    var introduction = x.content;
    var title = x.text;
    var tags = x.subject.split("/"); //array
    var image = x.image.split("%*@"); //array - the path in storage
    var time = x.timeStamp;
    var key = x.key;
    var time_s = Date(time)
      .toString()
      .split(" ");
    tags = tags.join('</div> <div class="tag-s">');
    pre_app.innerHTML += `
    <li onclick="display_content('${key}')">
      <small>
        <h4>${title}</h4>
        <p><div class="tag-s">${tags}</div></p>
        <p>${time_s[3] + " " + time_s[1] + " " + time_s[2]} | ${author_name}</p>
      </small>
    </li>
    `;
  });
  //....
  //insert pre_app
  var parent_ = document.querySelector("#search");
  var ul_DOM = document.createElement("ul");
  //ul_DOM.classList.add("row");
  ul_DOM.id = "result_display";
  parent_.children[0].remove();
  ul_DOM.append(pre_app);
  parent_.append(ul_DOM);

  document.querySelector("#loading").setAttribute("style", "display:none;");
  document.querySelector("#content").setAttribute("style", "display:none;");
  document.querySelector("#top").setAttribute("style", "");
  document.querySelector("#search").setAttribute("style", "");
}

/**
 * @function
 * @name display_content
 * @param {string} key - It can be found in the out put (data_requester.prototype.once)
 */
function display_content(key) {
  document.querySelector("#loading").setAttribute("style", "");
  document.querySelector("#content").setAttribute("style", "display:none;");
  document.querySelector("#search").setAttribute("style", "display:none;");
  document.querySelector("#top").setAttribute("style", "display:none;");

  var x = last_notes.find(x => x.key === key);
  pre_app = document.createElement("div");
  var author_uid = x.uid;
  var author_photo = x.picture; //url
  var author_name = x.displayName;
  var introduction = x.content;
  var title = x.text;
  var tags = x.subject.split("/"); //array
  var image = x.image.split("%*@"); //array - the path in storage
  var time = x.timeStamp;
  var time_s = Date(time)
    .toString()
    .split(" ");
  tags = tags.join('</div> <div class="tag-s">');
  pre_app.innerHTML = `

  <div>
    <small>
      <p>${time_s[3] + " " + time_s[1] + " " + time_s[2]} | ${author_name}</p>
    </small>
  </div>
  <small><h4>${title}</h4></small>
  <p>簡介:${introduction}</p>
  <small><p><div class="tag-s">${tags}</div></p></small>
  <!--省略-->
  `;
  image = image.map(function(x) {
    return { path: x, HTML_id: ran() };
  });
  pre_app.innerHTML += `<div class="img-warp">`;
  image.forEach(function(x) {
    pre_app.innerHTML += `
    <img id="${x.HTML_id}" class="img-scale">
    `;
  });
  pre_app.innerHTML += `</div>`;
  pre_app.innerHTML += `
  <!--admin-->
  <div class="admin">
  <div class="ctrl-pal">
  <hr></hr>
  <button onclick="approve_note('${key}')" class="btn btn-danger">同意</button>
  <button onclick="deny_note('${key}')" class="btn btn-danger">否認</button>
  </div>
  <hr></hr>
  
  <div class="wrapper">
  <form onsubmit="return false">
    <div class="form-group tick_">
      <label>檔案:</label>
      <input
        type="file"
        class="form-control"
        id="photo"
        accept="image/*"
        multiple
      />
    </div>
    <div class="form-group">
      <label>標題:</label>
      <input type="textarea" class="form-control" id="introduce" />
    </div>
    <div class="form-group">
      <label>簡介:</label>
      <textarea
        type="textarea"
        class="form-control"
        id="content-t"
        rows="3"
      ></textarea>
    </div>
    <div class="form-group">
      <label>標籤:</label>
      <input
        type="textarea"
        class="form-control"
        id="sort"
        placeholder="請用空格格開"
      />
      <button onclick="change_note('${key}')" class="btn btn-danger">更改</button>
    </div>
  </div>
  `;
  var parent_ = document.querySelector("#content");
  parent_.children[0].remove();
  var div_DOM = document.createElement("div");
  div_DOM.id = "in_c";
  div_DOM.append(pre_app);
  parent_.append(div_DOM);
  document.querySelector("#loading").setAttribute("style", "display:none;");
  document.querySelector("#content").setAttribute("style", "");
  document.querySelector("#top").setAttribute("style", "");
  image.forEach(function(x) {
    GetFile(x.path, x.HTML_id);
  });
}

/**
 * @constructor
 * @name data_requester
 * @param path {string} - the path in the realtime
 * @param sort_rule {string} - the sub-value
 */
function data_requester(path, sort_rule) {
  if (path != undefined) {
    /**
     * @member {string}
     * @name path
     * @class data_requester
     * The path to the database
     */
    this.path = path;
  }
  if (sort_rule != undefined) {
    /**
     * @member {string}
     * @name sort
     * The sort according,if the ASCII value is smaller,the latter it is
     * default is false(which means on sort,random).
     */
    this.sort = sort_rule;
  }
}

data_requester.prototype.sort = false;

data_requester.prototype.path = false;

data_requester.prototype.last_result = new Array();

/**
 * @abstract data_requester
 * @function
 *
 * @name check_c
 * check if there are somthing wrong with the config.
 * @returns {bool} - false means not inited.
 */
data_requester.prototype.check_c = function() {
  if (this.path !== false /*&&this.item_indexs!=0*/) {
    return true;
  } else {
    console.warn("not inited");
    return false;
  }
};

/**
 * @abstract data_requester
 * @async
 * @name once
 * get the data.
 * @returns {obj[]} - array in realtime base
 */
data_requester.prototype.once = function() {
  //init the var
  var sort = this.sort;
  var path = this.path;
  this.check_c();
  return new Promise(function(resolve, reject) {
    var main_arr = new Array();
    function filter_msg(obj) {
      if (obj.key != undefined) {
        main_arr.push({
          r_key: obj.key,
          value: obj.value
        });
        if (obj.left.key != undefined) {
          filter_msg(obj.left);
        }
        if (obj.right.key != undefined) {
          filter_msg(obj.right);
        }
      }
    }
    function get_info(input) {
      var info_arr = new Array();
      var a = {};
      var index_a = 0;
      function filter_info(obj) {
        if (obj.key != undefined) {
          info_arr.push({
            key: obj.key,
            value_: obj.value.value_
          });
          index_a++;
          if (obj.left.key != undefined) {
            filter_info(obj.left);
          }
          if (obj.right.key != undefined) {
            filter_info(obj.right);
          }
        }
      }
      filter_info(input.value.children_.root_);
      for (var b = 0; b < index_a; b = b + 1) {
        a[info_arr[b].key] = info_arr[b].value_;
      }
      a.key = input.r_key;
      return a;
    }
    firebase
      .database()
      .ref(path)
      .once("value")
      .then(function(snapshot) {
        filter_msg(snapshot.node_.children_.root_);
      })
      .then(
        function() {
          var result = new Array();
          main_arr = main_arr.map(get_info);
          if (sort === false) {
            result = main_arr;
          } else {
            var timeList = main_arr
              .map(function(x) {
                return x[sort];
              })
              .sort();
            for (var b = 0; b < timeList.length; b = b + 1) {
              result.push(
                main_arr.find(element => element[sort] == timeList[b])
              );
            }
          }
          resolve(result);
        },
        function() {
          console.error("Error");
        }
      );
  });
};

function ran() {
  ran_id++;
  return "A" + ran_id;
}

function act_search() {
  last_search = document.querySelector("#search_input").value.split(" ");
  Back_search(last_search);
  document.querySelector("#search_input").value = "";
}

function a() {
  Back_search(last_search);
}
document.querySelector("#search_act").onclick = act_search;
function gen_ran() {
  var re = "A";
  for (var r = 0; r < 9; r++) {
    re += Math.floor(Math.random() * 10);
  }
  return re;
}

function approve_note(reserved_key) {
  console.warn("It is dangerous to make mistake on this operation,be careful!");
  firebase
    .database()
    .ref("note/" + reserved_key + "/approved")
    .set("true");
  alert("finish(approve)");
}

function change_note(reserved_key) {
  var changing_info = last_notes.filter(function(e) {
    return e.key == reserved_key;
  })[0];
  firebase
    .database()
    .ref("note/" + reserved_key + "/approved")
    .set("true");
  alert("finish(change)");
  if (document.querySelector("#photo").files.length != 0) {
    changing_info.image.split("%*@").forEach(function(path) {
      storageRef.child(path).delete();
    });
    FileList.prototype.forEach = Array.prototype.forEach;
    var img_arr = [];
    document.querySelector("#photo").files.forEach(function(ele) {
      var current_path = "/image/" + gen_ran();
      img_arr.push(current_path);
      PushFile(current_path, ele);
    });
    firebase
      .database()
      .ref("note/" + reserved_key + "/image")
      .set(img_arr.join("%*@"));
  }
  if (document.querySelector("#introduce").value != "") {
    firebase
      .database()
      .ref("note/" + reserved_key + "/text")
      .set(document.querySelector("#introduce").value);
  }
  if (document.querySelector("#content-t").value != "") {
    firebase
      .database()
      .ref("note/" + reserved_key + "/content")
      .set(document.querySelector("#content-t").value);
  }
  if (document.querySelector("#sort").value != "") {
    firebase
      .database()
      .ref("note/" + reserved_key + "/subject")
      .set(
        document
          .querySelector("#sort")
          .value.split(" ")
          .join("/")
      );
  }
}

function deny_note(reserved_key) {
  var deleting_info = last_notes.filter(function(e) {
    return e.key == reserved_key;
  })[0];
  //new delete from storage
  deleting_info.image.split("%*@").forEach(function(path) {
    storageRef.child(path).delete();
  });
  firebase
    .database()
    .ref("note/" + reserved_key)
    .set({});
  alert("finish(deny)");
}

function log_out() {
  firebase.auth().signOut();
  window.location = "../index.html";
}
