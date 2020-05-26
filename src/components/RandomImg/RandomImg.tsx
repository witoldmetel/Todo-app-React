import React from 'react';

export interface Props {
  randomFace: string;
}

export default class RandomImg extends React.Component<Props> {
  public render() {
    const imgUrl = `https://api.adorable.io/avatars/${this.props.randomFace}.png`;

    return <img src={imgUrl} className="ui mini rounded image" />;
  }
}
