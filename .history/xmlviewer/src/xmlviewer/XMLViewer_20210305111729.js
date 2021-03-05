import React, { Component } from 'react';
import convert from 'xml-js';
import PropTypes from 'prop-types';

export default class XMLViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render() {
    const { xml, theme, invalidXml, indentSize, collapsible } = this.props;
    let json = null;

    const customTheme = { ...defaultTheme, ...theme };

    try {
      json = convert.xml2js(xml, { compact: false, spaces: 0 });
      if (!Array.isArray(json.elements)) {
        return invalidXml;
      }
    } catch (e) {
      return invalidXml;
    }
    return (
      <div {...props}>
        {json.declaration && (
          <DeclarationElement
            theme={customTheme}
            attributes={json.declaration.attributes}
          />
        )}
        <Elements
          elements={json.elements}
          theme={customTheme}
          indentSize={indentSize}
          indentation=""
          collapsible={collapsible}
        />
      </div>
    );
  }
}
