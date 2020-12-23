import React from 'react';
import classnames from 'classnames';

import { getAvatarImage } from '../../utils/helpers';

export interface Props {
  randomFace: string;

  className?: string;

  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export class RandomAvatar extends React.Component<Props> {
  private get className() {
    return classnames('ui mini circular image', this.props.className);
  }

  private get imgUrl() {
    return getAvatarImage(this.props.randomFace);
  }

  public render() {
    return (
      <img
        src={this.imgUrl}
        className={this.className}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      />
    );
  }
}
