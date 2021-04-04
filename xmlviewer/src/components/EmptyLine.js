import React, { Component } from 'react';
import './line.css';

export default class EmptyLine extends Component {
  render() {
    return (
      <div className="line-container">
        <span className="line-content" style={{ backgroundColor: 'white' }}>
          {' '}
        </span>
      </div>
    );
  }
}
