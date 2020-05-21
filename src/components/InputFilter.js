import React, { Component } from 'react';

export default class InputFilter extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className={this.props.isActive ? 'ui active button' : 'ui button'}
        filter={this.props.filter}
      >
        {this.props.name}
      </button>
    );
  }
}
