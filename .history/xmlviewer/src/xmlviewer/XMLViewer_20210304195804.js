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
    const { xml, indentSize, collapsible } = this.props;
    let json = null;
    try {
      json = convert(xml, { compact: false, spaces: 0 });
    }
    return <div></div>;
  }
}
