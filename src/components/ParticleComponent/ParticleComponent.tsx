import React, { Component } from 'react';
import p5 from 'p5';

import particle from './particle';

export class ParticleComponent extends Component {
  private particleRef: React.RefObject<HTMLInputElement>;

  public constructor(props: any) {
    super(props);

    this.particleRef = React.createRef();
  }

  public componentDidMount() {
    new p5(particle, this.particleRef.current as HTMLInputElement);
  }

  render() {
    return <div className="particle" ref={this.particleRef}></div>;
  }
}
