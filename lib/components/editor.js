/* eslint new-cap:0 no-unused-vars:0 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Editor = _react2["default"].createClass({
  displayName: "Editor",

  componentDidMount: function componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: "javascript",
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: false,
      matchBrackets: true,
      theme: this.props.theme,
      readOnly: this.props.readOnly
    });
    this.editor.on("change", this._handleChange);
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.readOnly || this.props.external) {
      this.editor.setValue(this.props.codeText);
    }
  },

  _handleChange: function _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  render: function render() {
    var editor = _react2["default"].createElement("textarea", { ref: "editor", defaultValue: this.props.codeText });

    return _react2["default"].createElement(
      "div",
      { style: this.props.style, className: this.props.className },
      editor
    );
  }
});

exports["default"] = Editor;
module.exports = exports["default"];