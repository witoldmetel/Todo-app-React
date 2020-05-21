import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilterButton extends Component {
  render() {
    const { name, onClick } = this.props;

    return (
      <button className="ui button" onClick={onClick} disabled>
        {name}
      </button>
    );
  }
}

FilterButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};
