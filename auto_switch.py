#!/usr/bin/env python3

import subprocess
import os
import time

curr_dir = os.path.dirname(os.path.abspath(__file__))

single_picture = "'file://" + curr_dir + "/1_screen.png'"
double_picture = "'file://" + curr_dir + "/2_screens.png'"
triple_picture = "'file://" + curr_dir + "/3_screens.png'"

def execute_set(command):
    subprocess.call(["/bin/bash", "-c", command])

def execute_get(command):
    return subprocess.check_output(["/bin/bash", "-c", command]).decode("utf-8").strip()

def switch_to_single():
    print("switching to single")
    execute_set("gsettings set org.gnome.desktop.background picture-uri " + single_picture)
    execute_set("gsettings set org.gnome.desktop.background picture-options zoom")

def switch_to_double():
    print("switching to double")
    execute_set("gsettings set org.gnome.desktop.background picture-uri " + double_picture)
    execute_set("gsettings set org.gnome.desktop.background picture-options spanned")

def switch_to_triple():
    print("switching to triple")
    execute_set("gsettings set org.gnome.desktop.background picture-uri " + triple_picture)
    execute_set("gsettings set org.gnome.desktop.background picture-options spanned")

def check_connected():
    command = "xrandr | grep -c -G '\\bconnected.*[0-9]+'"
    check = int(execute_get(command))
    return check

def check_wallpaper():
    check = execute_get("gsettings get org.gnome.desktop.background picture-uri")
    if check == single_picture:
        return "single"
    elif check == double_picture:
        return "double"
    elif check == triple_picture:
        return "triple"

def arrange():
    test = (check_connected(), check_wallpaper())
    print(test)
    if test == (1, "single") or test == (2, "double") or test == (3, "triple"):
        print("all good")
        pass
    elif test[0] == 1:
        switch_to_single()
    elif test[0] == 2:
        switch_to_double()
    elif test[0] == 3:
        switch_to_triple()

arrange()

#while True:
#    arrange()
#    time.sleep(5)

