/* eslint new-cap:0 no-unused-vars:0 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _babelCoreBrowser = require("babel-core/browser");

var _babelCoreBrowser2 = _interopRequireDefault(_babelCoreBrowser);

var getType = function getType(el) {
  var t = typeof el;

  if (Array.isArray(el)) {
    t = "array";
  } else if (el === null) {
    t = "null";
  }

  return t;
};

var wrapMap = {
  wrapnumber: function wrapnumber(num) {
    return _react2["default"].createElement(
      "span",
      { style: { color: "#6170d5" } },
      num
    );
  },

  wrapstring: function wrapstring(str) {
    return _react2["default"].createElement(
      "span",
      { style: { color: "#F2777A" } },
      "'" + str + "'"
    );
  },

  wrapboolean: function wrapboolean(bool) {
    return _react2["default"].createElement(
      "span",
      { style: { color: "#48A1CF" } },
      bool ? "true" : "false"
    );
  },

  wraparray: function wraparray(arr) {
    return _react2["default"].createElement(
      "span",
      null,
      "[",
      arr.map(function (entry, i) {
        return _react2["default"].createElement(
          "span",
          { key: i },
          wrapMap["wrap" + getType(entry)](entry),
          i !== arr.length - 1 ? ", " : ""
        );
      }),
      "]"
    );
  },

  wrapobject: function wrapobject(obj) {
    var pairs = [];
    var first = true;

    for (var key in obj) {
      pairs.push(_react2["default"].createElement(
        "span",
        { key: key },
        _react2["default"].createElement(
          "span",
          { style: { color: "#8A6BA1" } },
          (first ? "" : ", ") + key
        ),
        ": ",
        wrapMap["wrap" + getType(obj[key])](obj[key])
      ));

      first = false;
    }

    return _react2["default"].createElement(
      "i",
      null,
      "Object {",
      pairs,
      "}"
    );
  },

  wrapfunction: function wrapfunction() {
    return _react2["default"].createElement(
      "i",
      { style: { color: "#48A1CF" } },
      "function"
    );
  },

  wrapnull: function wrapnull() {
    return _react2["default"].createElement(
      "span",
      { style: { color: "#777" } },
      "null"
    );
  },

  wrapundefined: function wrapundefined() {
    return _react2["default"].createElement(
      "span",
      { style: { color: "#777" } },
      "undefined"
    );
  }
};

var Preview = _react2["default"].createClass({
  displayName: "Preview",

  propTypes: {
    code: _react2["default"].PropTypes.string.isRequired,
    scope: _react2["default"].PropTypes.object.isRequired
  },

  componentDidMount: function componentDidMount() {
    this._executeCode();
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    clearTimeout(this.timeoutID);
    if (this.props.code !== prevProps.code) {
      this._executeCode();
    }
  },

  _compileCode: function _compileCode() {
    return _babelCoreBrowser2["default"].transform("\n      (function(" + Object.keys(this.props.scope).join(",") + ") {\n        var list = [];\n        var console = { log(...x) {\n          list.push({val: x, multipleArgs: x.length !== 1})\n        }};\n        " + this.props.code + "\n        return list;\n      });\n    ", { stage: 1 }).code;
  },

  _setTimeout: function _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  _executeCode: function _executeCode() {
    var mountNode = this.refs.mount;

    try {
      _reactDom2["default"].unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e);
    }

    try {
      var scope = [];
      for (var s in this.props.scope) {
        if (this.props.scope.hasOwnProperty(s)) {
          scope.push(this.props.scope[s]);
        }
      }
      scope.push(mountNode);
      var compiledCode = this._compileCode();
      var Component = _react2["default"].createElement(_react2["default"].createClass({
        _createConsoleLine: function _createConsoleLine(x, multipleArgs) {
          var _this = this;

          return _react2["default"].createElement(
            "span",
            { style: { marginRight: "20px" } },
            multipleArgs ? x.map(function (y) {
              return _this._createConsoleLine([y], false);
            }) : wrapMap["wrap" + getType(x[0])](x[0])
          );
        },

        render: function render() {
          var _this2 = this;

          return _react2["default"].createElement(
            "div",
            { style: { padding: 15, fontFamily: "Consolas, Courier, monospace" } },
            eval(compiledCode).apply(null, scope).map(function (x, i) {
              return _react2["default"].createElement(
                "div",
                {
                  key: i,
                  style: {
                    borderBottom: "1px solid #ccc",
                    padding: "4px 0"
                  } },
                _this2._createConsoleLine(x.val, x.multipleArgs)
              );
            })
          );
        }
      }));
      _reactDom2["default"].render(Component, mountNode);
    } catch (err) {
      this._setTimeout(function () {
        _reactDom2["default"].render(_react2["default"].createElement(
          "div",
          { className: "playgroundError" },
          err.toString()
        ), mountNode);
      }, 500);
    }
  },

  render: function render() {
    return _react2["default"].createElement("div", { ref: "mount" });
  }
});

exports["default"] = Preview;
module.exports = exports["default"];