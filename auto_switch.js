#!/usr/bin/env node

var spawn = require('child_process').spawnSync;

var single_picture = "'file://" + process.cwd() + "/1_screen.png'"
var double_picture = "'file://" + process.cwd() + "/2_screens.png'"
var triple_picture = "'file://" + process.cwd() + "/3_screens.png'"

var execute_set = function(command){
  spawn('/bin/bash', ['-c', command]);
}

var execute_get = function(command){
  var bs = spawn('/bin/bash', ['-c', command]);
  return bs.stdout.toString().replace(/\n$/,'');
}

var switch_to_single = function(){
  console.log("switching to single");
  execute_set("gsettings set org.gnome.desktop.background picture-uri " + single_picture);
  execute_set("gsettings set org.gnome.desktop.background picture-options zoom");
}

var switch_to_double = function(){
  console.log("switching to double");
  execute_set("gsettings set org.gnome.desktop.background picture-uri " + double_picture);
  execute_set("gsettings set org.gnome.desktop.background picture-options spanned");
}

var switch_to_triple = function(){
  console.log("switching to triple");
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
  test = [check_connected(), check_wallpaper()].toString();
  console.log(test);
  if (test === '1,single' || test === '2,double' || test === '3,triple'){
    console.log("all good");
  } else if (test[0] == 1){
    switch_to_single();
  } else if (test[0] == 2){
    switch_to_double();
  } else if (test[0] == 3){
    switch_to_triple();
  }
}

arrange();
