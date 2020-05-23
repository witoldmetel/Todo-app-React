import React from 'react';

export interface Props {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default class InputFilter extends React.Component<Props> {
  public render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className={this.props.isActive ? 'ui active button' : 'ui button'}
      >
        {this.props.name}
      </button>
    );
  }
}
