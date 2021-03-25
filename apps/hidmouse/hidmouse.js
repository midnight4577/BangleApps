/*
Binary search keyboard for typing with
the touchscreen
*/

var storage = require('Storage');
var mouse = require("ble_hid_mouse");

NRF.setServices(undefined, { hid : mouse.report });

function btnPressed() {
  mouse.send(0,0,mouse.BUTTONS.LEFT); // X movement, Y movement, buttons pressed
}

// trigger btnPressed whenever the button is pressed
setWatch(btnPressed, BTN, {edge:"rising",repeat:true,debounce:50});
const settings = storage.readJSON('setting.json',1) || { HID: false };





if (settings.HID=="kb" || settings.HID=="kbmedia") {

} else {
  E.showPrompt("Enable HID?",{title:"HID disabled"}).then(function(enable) {
    if (enable) {
      settings.HID = "kbmedia";
      require("Storage").write('setting.json', settings);
      setTimeout(load, 1000, "hidmouse.app.js");
    } else setTimeout(load, 1000);
  });
}