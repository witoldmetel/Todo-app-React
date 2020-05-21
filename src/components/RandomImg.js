import React from 'react';
import PropTypes from 'prop-types';

export default class RandomImg extends React.Component {
  render() {
    const imgUrl = `https://api.adorable.io/avatars/55/${this.props.randomFace}.png`;
    return <img src={imgUrl} className="ui mini rounded image" title={this.props.title} />;
  }
}

RandomImg.propTypes = {
  randomFace: PropTypes.number,
  title: PropTypes.string,
};
