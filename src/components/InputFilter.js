import React, { Component } from 'react';

export default class InputFilter extends Component {
    render() {
        return (
            <button className="ui button">{this.props.name}</button>
        );
    }
}