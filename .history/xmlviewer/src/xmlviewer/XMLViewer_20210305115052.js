import React, { Component } from 'react';
import convert from 'xml-js';
import PropTypes from 'prop-types';
import DeclarationElement from './declaration-el';

const defaultTheme = {
  tagColor: '#d43900',
  textColor: '#333',
  attributeKeyColor: '#2a7ab0',
  attributeValueColor: '#008000',
  separatorColor: '#333',
  commentColor: '#aaa',
  cdataColor: '#1d781d',
  overflowBreak: false,
};

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
