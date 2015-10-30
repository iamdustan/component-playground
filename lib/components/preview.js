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

var Preview = _react2["default"].createClass({
  displayName: "Preview",

  propTypes: {
    code: _react2["default"].PropTypes.string.isRequired,
    scope: _react2["default"].PropTypes.object.isRequired,
    previewComponent: _react2["default"].PropTypes.node
  },

  getInitialState: function getInitialState() {
    return {
      error: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      previewComponent: 'div'
    };
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
    if (this.props.noRender) {
      var generateContextTypes = function generateContextTypes(context) {
        var keys = Object.keys(context).map(function (val) {
          return val + ": React.PropTypes.any.isRequired";
        });
        return "{ " + keys.join(", ") + " }";
      };

      return _babelCoreBrowser2["default"].transform("\n          (function (" + Object.keys(this.props.scope).join(", ") + ", mountNode) {\n            return React.createClass({\n              // childContextTypes: { test: React.PropTypes.string },\n              childContextTypes: " + generateContextTypes(this.props.context) + ",\n              getChildContext: function () { return " + JSON.stringify(this.props.context) + "; },\n              render: function () {\n                return (\n                  " + this.props.code + "\n                );\n              }\n            });\n          });\n        ", { stage: 1 }).code;
    } else {
      return _babelCoreBrowser2["default"].transform("\n          (function (" + Object.keys(this.props.scope).join(",") + ", mountNode) {\n            " + this.props.code + "\n          });\n        ", { stage: 1 }).code;
    }
  },

  _setTimeout: function _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  _executeCode: function _executeCode() {
    var _this = this;

    var mountNode = this.refs.mount;

    try {

      var scope = [];

      for (var s in this.props.scope) {
        if (this.props.scope.hasOwnProperty(s)) {
          scope.push(this.props.scope[s]);
        }
      }

      scope.push(mountNode);

      var compiledCode = this._compileCode();
      if (this.props.noRender) {
        var Component = _react2["default"].createElement(eval(compiledCode).apply(null, scope));
        _reactDom2["default"].render(_react2["default"].createElement(this.props.previewComponent, {}, Component), mountNode);
      } else {
        eval(compiledCode).apply(null, scope);
      }

      this.setState({
        error: null
      });
    } catch (err) {
      this._setTimeout(function () {
        _this.setState({
          error: err.toString()
        });
      }, 500);
    }
  },

  render: function render() {
    return _react2["default"].createElement(
      "div",
      null,
      this.state.error !== null ? _react2["default"].createElement(
        "div",
        { className: "playgroundError" },
        this.state.error
      ) : null,
      _react2["default"].createElement("div", { ref: "mount", className: "previewArea" })
    );
  }
});

exports["default"] = Preview;
module.exports = exports["default"];