import React, { Component } from 'react';

export default class Greeting extends Component {
  render() {
    return (
      <div className="greeting">
        Hello, {this.props.name}!
      </div>
    );
  }
}
