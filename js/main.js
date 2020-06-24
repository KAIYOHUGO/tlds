function rm_loader() {
  $("#bg").removeClass("unv");
  $("#ld").addClass("unv");
}
function ad_loader() {
  $("#bg").addClass("unv");
  $("#ld").removeClass("unv");
}
$(function() {
  $("#nojs").remove();
});
