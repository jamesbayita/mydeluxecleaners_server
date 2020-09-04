"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getTimeStamp() {
  var date = new Date(); // DATE

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
  var da, mo, ye;
  da = date.getDate();
  mo = months[date.getMonth()];
  ye = date.getFullYear();
  var timestamp = "".concat(mo, " ").concat(da, ", ").concat(ye);
  return timestamp;
}

var _default = getTimeStamp;
exports["default"] = _default;