import React from 'react';

export default class FilterButton extends React.Component {
  render() {
    const { name, onClick } = this.props;

    return (
      <button className="ui button" onClick={onClick} disabled>
        {name}
      </button>
    );
  }
}
