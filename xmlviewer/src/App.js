import './App.css';
import XMLViewer from './xmlviewer/XMLViewer';
import React, { Component } from 'react';
import XMLData from './xmlviewer/examplexml.xml';
import axios from 'axios';

let xml = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { xml: xml };
  }

  componentDidMount() {
    if (!this.state.xml) {
      axios
        .get(XMLData, {
          'Content-Type': 'application/xml; charset=utf-8',
        })
        .then((response) => {
          this.setState({ xml: response.data });
        });
    }
  }

  render() {
    if (!this.state.xml) {
      return 'nothing';
    } else
      return (
        <div className="App" style={{ textAlign: 'left' }}>
          <XMLViewer
            isCollapsible={true}
            xml={this.state.xml}
            theme={{ elementPadding: '100px' }}
          />
        </div>
      );
  }
}
