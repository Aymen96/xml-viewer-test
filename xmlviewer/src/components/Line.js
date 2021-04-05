import React, { Component } from 'react';
import './line.css';

export default class Line extends Component {
  render() {
    const { added, removed, count, children } = this.props;
    // bg color green for additions, red for deletions, grey for common lines
    let color = added ? '#eaf2c2' : removed ? '#fadad7' : '#eee';
    return (
      <div className="line-container">
        {count && <span className="line-enumeration">{count}</span>}
        <span className="line-content" style={{ backgroundColor: color }}>
          {children}
        </span>
      </div>
    );
  }
}
