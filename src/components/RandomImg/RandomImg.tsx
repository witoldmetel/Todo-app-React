import React from 'react';
import classnames from 'classnames';

export interface Props {
  randomFace: string;
  className?: string;
}

export default class RandomImg extends React.Component<Props> {
  private get className() {
    return classnames('ui mini rounded image', this.props.className);
  }

  public render() {
    const imgUrl = `https://api.adorable.io/avatars/${this.props.randomFace}.png`;

    return <img src={imgUrl} className={this.className} />;
  }
}
