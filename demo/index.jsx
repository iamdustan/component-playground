/* eslint new-cap:0 no-unused-vars:0 */
"use strict";

var React = require("react");
var Playground = require("playground");

require("./styles/syntax.css");
require("./styles/codemirror.css");
require("./styles/demo.css");

var Button = require("./components/button");
var componentExample = require("raw!./examples/component.example");

var DebugInfo = require("./components/debug-info");
var contextExample = require("raw!./examples/context.example");

var es6Example = require("raw!./examples/es6.example");

var Index = React.createClass({
  render() {
    return (
      <div className="component-documentation">
        <h2>Default</h2>

        <Playground
          codeText={componentExample}
          scope={{React: React, Button: Button}}/>

        <h2>Collapsable Code</h2>

        <Playground
          codeText={componentExample}
          scope={{React: React, Button: Button}}
          collapsableCode={true}/>

        <h2>Collapsable Code (Expanded by Default)</h2>

        <Playground
          codeText={componentExample}
          scope={{React: React, Button: Button}}
          collapsableCode={true}
          initiallyExpanded/>

        <h2>Prop Descriptions</h2>

        <Playground
          codeText={componentExample}
          scope={{React: React, Button: Button}}
          propDescriptionMap={{
            buttonStyle: "style object for inline styles"
          }}
          docClass={Button}
          collapsableCode={true}/>

        <h2>With Context</h2>

        <Playground
          context={{environment: "staging"}}
          codeText={contextExample}
          scope={{React: React, DebugInfo: DebugInfo}}/>

        <h2>ES6 Console</h2>

        <Playground
          codeText={es6Example}
          es6Console={true}
          scope={{React: React, Button: Button}}/>
      </div>
    );
  }
});

React.render(<Index/>, document.getElementById("root"));
