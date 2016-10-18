import React, { Component, PropTypes } from 'react';

export default class SelectGenre extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <p>Filter movies by genre:</p>
        <input size="45"
               ref="input"
               defaultValue={this.props.value}/>
        <button onClick={this.onChange}>
          Go!
        </button>
      </div>
    );
  }
}
