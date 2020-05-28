import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { MODAL_SIZES } from '../../fixtures/constants';

export interface Props {
  title: string;
  content: Element | string;
  modalSize: MODAL_SIZES;
  history: any;
  onConfirmClick: () => void;
}

export default class Dialog extends Component<Props> {
  static defaultProps = {
    modalSize: MODAL_SIZES.SMALL,
  };

  onDismissClick = () => {
    this.props.history.push('/');
  };

  private get modalContent() {
    const { modalSize, title, content, onConfirmClick } = this.props;

    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className={`ui ${modalSize} modal visible active`}>
          <div className="header">{title}</div>
          <div className="content">{content}</div>
          <div className="actions">
            <button className="ui negative button" onClick={onConfirmClick}>
              Ok
            </button>
            <button className="ui button" onClick={this.onDismissClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  public render() {
    return ReactDOM.createPortal(this.modalContent, document.getElementById('modal') as HTMLElement);
  }
}
