"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var usersRouter = _express["default"].Router();

usersRouter.get('', function (req, res) {
  res.send('Hello World');
});
var _default = usersRouter;
exports["default"] = _default;