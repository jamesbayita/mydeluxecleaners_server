"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateUser = _joi["default"].object({
  first_name: _joi["default"].string().min(1).max(20).trim().uppercase().required(),
  last_name: _joi["default"].string().min(1).max(20).trim().uppercase().required(),
  email: _joi["default"].string().email().trim().required()
}).options({
  abortEarly: false
});

var _default = validateUser;
exports["default"] = _default;