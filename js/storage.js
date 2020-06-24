//init for storage service
//move to readNote.js
/**
 * Download file in storage
 * @param {string} path - path in the storage.
 * @param {string} HTML_ID - automatic put the file into the <img> element.
 * @returns {Promise} - resolve with url
 * @async
 * @name GetFile
 * @example
 *  GetFile("/image/擷取.PNG").then(x=>(document.getElementById('myimg').src=x;))
 */
function GetFile(path, HTML_ID) {
  if (path == undefined) {
    console.warn("invalid file path");
    return new Promise(function(resolve) {
      resolve("invalid file path");
    });
  }

  return new Promise(function(RESOLVE, REJECT) {
    storageRef
      .child(path)
      .getDownloadURL()
      .then(function(url) {
        if (HTML_ID != undefined) {
          var img = document.getElementById(HTML_ID);
          img.src = url;
        }
        RESOLVE(url);
      });
  });
}

/**
 * upload the file to the storage
 * @function
 * @name PushFile
 * @param {string} path - upload path
 * @param {string} file - file
 * @example 
 *  document.querySelector("#myfile").addEventListener("change",function(ele){
  PushFile("/image/擷取2.png",ele.target.files[0]);
  })
*/
function PushFile(path, file) {
  if (path == undefined) {
    console.warn("invalid file path");
  }
  var uploadTask = storageRef.child(path).put(file);
  uploadTask.on("state_changed", new Function());
}

/**
 * Admin only
 */
function DeleteFile(path) {
  if (path == undefined) {
    console.warn("invalid file path");
  }
  var deleteTask = storageRef.child(path).delete();
}
