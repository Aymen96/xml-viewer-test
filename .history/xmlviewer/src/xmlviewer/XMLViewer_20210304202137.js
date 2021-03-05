import React, { Component } from 'react';
import convert from 'xml-js';

export default class XMLViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render() {
    const { xml, invalidXml, indentSize, collapsible } = this.props;
    let json = null;
    try {
      json = convert.xml2js(xml, { compact: false, spaces: 0 });
      if (!Array.isArray(json.elements)) {
        return invalidXml;
      }
    } catch (e) {
      return invalidXml;
    }
    return <div></div>;
  }
}
