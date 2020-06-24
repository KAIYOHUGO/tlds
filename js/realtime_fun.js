/**
 * @constructor
 * @name data_requester
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

/*
var a=new data_requester("/note","time")
a.once().then(function(input){
  input=input.filter(functions(x){x.approved});
  input.foreach(function(x){
    console.log(x.image.split("%*@"));//image array
  })
})
*/
