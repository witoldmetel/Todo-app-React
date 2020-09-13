import React from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'semantic-ui-react';

export interface Props {
  header: string | Element;
  content: string | JSX.Element;
  actionButtons: JSX.Element;
  history: any;
}

export class ModalComponent extends React.Component<Props> {
  state = { open: true };

  private closeModal = () => {
    this.setState({ open: false });
    this.props.history.goBack();
  };

  public render() {
    return createPortal(
      <Modal dimmer="blurring" open={this.state.open} onClose={this.closeModal}>
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>{this.props.content}</Modal.Content>
        <Modal.Actions>{this.props.actionButtons}</Modal.Actions>
      </Modal>,
      document.getElementById('modal_root') as Element,
    );
  }
}
