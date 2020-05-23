import React from 'react';

export interface Props {
  name: string;
  onClick: () => void;
}

export default class FilterButton extends React.Component<Props> {
  render() {
    const { name, onClick } = this.props;

    return (
      <button className="ui button" onClick={onClick} disabled>
        {name}
      </button>
    );
  }
}
