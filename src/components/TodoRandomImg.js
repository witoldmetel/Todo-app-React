import React, { Component } from 'react';

class TodoRandomImg extends Component {
    render() {
        const { randomFace } = this.props;
        const imgUrl = `https://api.adorable.io/avatars/55/${randomFace}.png`;
        return (
                <img src={imgUrl} className="ui mini rounded image" />
        );
    }
}

export default TodoRandomImg;