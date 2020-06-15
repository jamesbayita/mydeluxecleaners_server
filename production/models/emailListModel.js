"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First Name is required"]
  },
  last_name: {
    type: String,
    required: [true, "Last Name is required"]
  },
  email: {
    type: String,
    validate: {
      validator: function validator(email) {
        return User.doesNotExist({
          email: email
        });
      },
      message: "This email is already subscribed to this mailing list"
    },
    required: [true, "Email is required"]
  },
  permissionLevel: Number
}, {
  collection: 'email list'
});

userSchema.statics.doesNotExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.where(field).countDocuments();

          case 2:
            _context.t0 = _context.sent;
            return _context.abrupt("return", _context.t0 === 0);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var User = _mongoose["default"].model('', userSchema);

var _default = User;
exports["default"] = _default;