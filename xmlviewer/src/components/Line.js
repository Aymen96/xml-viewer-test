import React, { Component } from 'react';
import './line.css';

export default class Line extends Component {
  render() {
    const { count, bgColor, children } = this.props;
    return (
      <div className="line-container">
        {count && <span className="line-enumeration">{count}</span>}
        <span
          className="line-content"
          style={{ backgroundColor: bgColor ? bgColor : 'white' }}
        >
          {children}
        </span>
      </div>
    );
  }
}
