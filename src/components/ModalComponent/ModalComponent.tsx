import React from 'react';
import { History } from 'history';
import { Modal } from 'semantic-ui-react';

import { MODAL_SIZE } from '../../fixtures/constants';

interface Props {
  header: string | Element;
  content: string | JSX.Element;
  actionButtons: JSX.Element;
  history: History;

  size?: MODAL_SIZE;
  className?: string;
}

interface State {
  open: boolean;
}

export class ModalComponent extends React.Component<Props, State> {
  state = { open: true };

  private closeModal = () => {
    this.setState({ open: false });

    this.props.history.goBack();
  };

  public render() {
    return (
      <Modal
        dimmer="blurring"
        className={this.props.className}
        open={this.state.open}
        onClose={this.closeModal}
        size={this.props.size}
      >
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>{this.props.content}</Modal.Content>
        <Modal.Actions>{this.props.actionButtons}</Modal.Actions>
      </Modal>
    );
  }
}
