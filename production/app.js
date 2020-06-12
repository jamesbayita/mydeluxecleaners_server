"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = require("./config");

var _index = require("./routes/index");

// APP SERVER
// CONNECT TO MONGO
function connectMongo() {
  return _connectMongo.apply(this, arguments);
}

function _connectMongo() {
  _connectMongo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(_config.MONGO_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            console.log('MONGOOSE CONNECTED SUCCESSFULLY');
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log("There was an error connecting to mongoose ".concat(_context.t0));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _connectMongo.apply(this, arguments);
}

connectMongo(); // SET UP EXPRESS APP

var app = (0, _express["default"])();
app.disable('x-powered-by');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // SET UP EXPRESS ROUTES

var apiRouter = _express["default"].Router();

app.use('/api', apiRouter);
apiRouter.use('/users', _index.usersRouter);
var _default = app;
exports["default"] = _default;