"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _emailListModel = _interopRequireDefault(require("../models/emailListModel"));

var _validation = _interopRequireDefault(require("../helpers/validation"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _getTimeStamp = _interopRequireDefault(require("../helpers/getTimeStamp"));

var _config = require("../config");

_mail["default"].setApiKey(_config.SENDGRID_API_KEY);

var usersRouter = _express["default"].Router();

usersRouter.get('', function (req, res) {
  res.send('Hello World');
});
usersRouter.post('', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, first_name, last_name, email, user, msg;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // DESTRUCTURE THE REQ.BODY OBJECT
            _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email; // VALIDATE THE OBJECTS VALUES WITH JOI

            _context.next = 4;
            return _validation["default"].validateAsync({
              first_name: first_name,
              last_name: last_name,
              email: email
            });

          case 4:
            // CREATE NEW USER OBJECT AND SAVE IT TO DB
            user = new _emailListModel["default"]({
              first_name: first_name,
              last_name: last_name,
              email: email
            }); // USER SCHEMA VALIDATOR WILL CHECK IF EMAIL ALREADY EXISTS
            // WILL RETURN ERROR IF TRUE

            _context.next = 7;
            return user.save().then(function (doc) {
              res.status(201).json({
                success: true,
                doc: doc
              });
            });

          case 7:
            msg = {
              to: email,
              from: 'support@mydeluxecleaners.com',
              templateId: 'd-a19357056bb94b8f936741893f66dbc4',
              dynamic_template_data: {
                first_name: first_name,
                last_name: last_name,
                date: (0, _getTimeStamp["default"])()
              }
            };
            _context.next = 10;
            return _mail["default"].send(msg);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            // HANDLE ERRORS
            res.status(400).json({
              success: false,
              error: _context.t0
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = usersRouter;
exports["default"] = _default;