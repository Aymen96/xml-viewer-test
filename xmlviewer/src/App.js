import './App.css';
import XMLViewer from './xmlviewer/XMLViewer';
import React, { Component } from 'react';
import XMLData1 from './xmlviewer/MenuConfiguration.xml';
import XMLData2 from './xmlviewer/MenuConfigurationEdited.xml';
import axios from 'axios';

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
    let leftSideContent;
    let rightSideContent;
    if (!this.state.xml1) {
      leftSideContent = 'nothing';
    } else {
      leftSideContent = (
        <div className="App" style={{ textAlign: 'left' }}>
          <XMLViewer
            isCollapsible={true}
            xml={this.state.xml1}
            theme={{ elementPadding: '100px' }}
          />
        </div>
      );
    }
    if (!this.state.xml2) {
      rightSideContent = 'nothing';
    } else {
      rightSideContent = (
        <div className="App" style={{ textAlign: 'left' }}>
          <XMLViewer
            isCollapsible={true}
            xml={this.state.xml2}
            theme={{ elementPadding: '100px' }}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <div id="side1" className="side bg-blue">
          {leftSideContent}
        </div>
        <div id="side2" className="side bg-red">
          {rightSideContent}
        </div>
      </div>
    );
    /*
    
      */
  }
}
