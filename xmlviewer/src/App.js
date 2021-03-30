import './App.css';
import XMLViewer from './xmlviewer/XMLViewer';
import React, { Component } from 'react';
import XMLData1 from './xmlviewer/MenuConfiguration.xml';
import XMLData2 from './xmlviewer/MenuConfigurationEdited.xml';
import axios from 'axios';
import { diffLines, diffArrays } from 'diff';
import convert from 'xml-js';
import { formatXML, formatXMLModified, xmlToHtml } from './xmlviewer/utils';

let xml1 = null;
let xml2 = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { xml1: xml1, xml2: xml2 };
  }

  componentDidMount() {
    if (!this.state.xml1) {
      axios
        .get(XMLData1, {
          'Content-Type': 'application/xml; charset=utf-8',
        })
        .then((response) => {
          this.setState({ xml1: response.data });
        });
    }
    if (!this.state.xml2) {
      axios
        .get(XMLData2, {
          'Content-Type': 'application/xml; charset=utf-8',
        })
        .then((response) => {
          this.setState({ xml2: response.data });
        });
    }
  }

  render() {
    if (!this.state.xml1 && !this.state.xml2) {
      return 'nothing';
    }
    let original = formatXMLModified(this.state.xml1);
    let modified = formatXMLModified(this.state.xml2);
    console.log(original.length);
    let changes = diffArrays(original, modified);
    console.log(changes);
    changes = changes.map((part, index) => {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added ? '#eaf2c2' : part.removed ? '#fadad7' : 'white';
      return part.length == 1 ? (
        <span
          key={'line' + index}
          style={{ backgroundColor: color, display: 'block' }}
        >
          <span>{part.value[0]}</span>
        </span>
      ) : (
        part.value.map((value, i) => (
          <span
            key={'line' + index + i}
            style={{ backgroundColor: color, display: 'block' }}
          >
            <span>{value}</span>
          </span>
        ))
      );
    });
    changes = changes.flat();
    return (
      <div className="container">
        <div
          id="side1"
          className="side bg-blue"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {xmlToHtml(original)}
        </div>
        <div
          id="side2"
          className="side bg-red"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {changes}
        </div>
      </div>
    );
  }
}
