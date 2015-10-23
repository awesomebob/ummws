#!/usr/bin/env node

var spawn = require('child_process').spawnSync;

var single_picture = "'file://" + __dirname + "/1_screen.png'"
var double_picture = "'file://" + __dirname + "/2_screens.png'"
var triple_picture = "'file://" + __dirname + "/3_screens.png'"

var execute_set = function(command){
  spawn('/bin/bash', ['-c', command]);
}

var execute_get = function(command){
  var bs = spawn('/bin/bash', ['-c', command]);
  return bs.stdout.toString().replace(/\n$/,'');
}

var switch_to_single = function(){
  execute_set("notify-send 'switching to single-monitor background'");
  execute_set("gsettings set org.gnome.desktop.background picture-uri " + single_picture);
  execute_set("gsettings set org.gnome.desktop.background picture-options zoom");
}

var switch_to_double = function(){
  execute_set("notify-send 'switching to double-monitor background'");
  execute_set("gsettings set org.gnome.desktop.background picture-uri " + double_picture);
  execute_set("gsettings set org.gnome.desktop.background picture-options spanned");
}

var switch_to_triple = function(){
  execute_set("notify-send 'switching to triple-monitor background'");
  execute_set("gsettings set org.gnome.desktop.background picture-uri " + triple_picture);
  execute_set("gsettings set org.gnome.desktop.background picture-options spanned");
}

var check_connected = function(){
  return parseInt(execute_get("xrandr | grep -c -G '\\bconnected.*[0-9]+'"));
}

var check_wallpaper = function(){
  check = execute_get("gsettings get org.gnome.desktop.background picture-uri");
  if (check === single_picture){
    return "single";
  } else if (check === double_picture){
    return "double";
  } else if (check === triple_picture){
    return "triple";
  }
}

var arrange = function(){
  var test = [check_connected(), check_wallpaper()];
  var testString = test.join(', ');
  console.log(testString);
  if (testString === "1, single" || testString === "2, double" || testString === "3, triple"){
    execute_set("notify-send 'already on " + test[1] + "-monitor wallpaper'");
  } else if (test[0] === 1){
    switch_to_single();
  } else if (test[0] === 2){
    switch_to_double();
  } else if (test[0] === 3){
    switch_to_triple();
  }
}

arrange();
