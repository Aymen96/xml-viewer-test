import './App.css';
import React, { Component } from 'react';
import XMLData1 from './xmlviewer/MenuConfiguration.xml';
import XMLData2 from './xmlviewer/MenuConfigurationEdited.xml';
import axios from 'axios';
import { diffArrays } from 'diff';
import { formatXMLModified } from './xmlviewer/utils';
import Line from './components/Line';
import EmptyLine from './components/EmptyLine';

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
    if (!this.state.xml1 || !this.state.xml2) {
      return 'nothing';
    }
    let original = formatXMLModified(this.state.xml1);
    let modified = formatXMLModified(this.state.xml2);
    let changes = diffArrays(original, modified);
    let counter = 1;
    let numberOfEmptyLines = 0;
    let originalWithDiff = changes.map((part, index) => {
      numberOfEmptyLines = 0;
      if (part.added) {
        if (index === 0 || !changes[index - 1].removed) {
          numberOfEmptyLines = part.count;
        } else if (changes[index - 1].removed) {
          numberOfEmptyLines = part.count - changes[index - 1].count;
          numberOfEmptyLines = numberOfEmptyLines > 0 ? numberOfEmptyLines : 0;
        }
      }
      return (
        <React.Fragment>
          {!part.added &&
            (part.length === 1 ? (
              <Line count={counter++} added={part.added} removed={part.removed}>
                {part.value[0]}
              </Line>
            ) : (
              part.value.map((value, i) => (
                <Line
                  count={counter++}
                  added={part.added}
                  removed={part.removed}
                >
                  {value}
                </Line>
              ))
            ))}
          {part.added && Array(numberOfEmptyLines).fill(<EmptyLine />)}
        </React.Fragment>
      );
    });
    originalWithDiff = originalWithDiff.flat();
    // reset counters for diff xml generation
    counter = 1;

    let xmlWithDiff = changes.map((part, index) => {
      numberOfEmptyLines = 0;
      if (part.added) {
        if (index !== 0) {
          numberOfEmptyLines = changes[index - 1].count - part.count;
          numberOfEmptyLines = numberOfEmptyLines > 0 ? numberOfEmptyLines : 0;
        }
      }
      return (
        <React.Fragment>
          {!part.removed &&
            (part.length === 1 ? (
              <Line count={counter++} added={part.added} removed={part.removed}>
                {part.value[0]}
              </Line>
            ) : (
              part.value.map((value, i) => (
                <Line
                  count={counter++}
                  added={part.added}
                  removed={part.removed}
                >
                  {value}
                </Line>
              ))
            ))}
          {part.added && Array(numberOfEmptyLines).fill(<EmptyLine />)}
        </React.Fragment>
      );
    });
    xmlWithDiff = xmlWithDiff.flat();
    return (
      <div>
        <p>Original</p>
        <div className="container">
          <div
            id="side1"
            className="side bg-blue"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {originalWithDiff}
          </div>
          <div
            id="side2"
            className="side bg-red"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {xmlWithDiff}
          </div>
        </div>
      </div>
    );
  }
}
