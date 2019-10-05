import React, { Component } from 'react';
import { Form, Message, Button, Modal, Dropdown, Icon, Table, Label, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Modal_ChangeAccessGroup extends Component {
    state = {
        open: false,
        userId: this.props.userId,
        newRole: this.props.currentRole
    }

    closeModal = () => this.setState({ open: false });
    openModal = () => this.setState({ open: true });

    submit = () => {
        if (this.state.newRole) {
            this.props.updateMemberAccess({
                userId: this.state.userId,
                role: this.state.newRole
            });
        }
    }

    render() {
        const { open } = this.state
        console.log("Modal_ChangeAccessGroup", this.props);
        /* console.log("Modal_ChangeAccessGroup", this.props);
        console.log("Modal_ChangeAccessGroup", this.state); */

        return (
            <Modal size='small' open={open} trigger={<Button onClick={this.openModal} compact icon><Icon name='edit' /></Button>}>
                <Modal.Header>
                    <Icon name='edit outline' />
                    <small>Update {this.props.userName}'s Role</small>
                    <Icon name='close' style={{ float: 'right' }} onClick={this.closeModal} />
                </Modal.Header>
                <Modal.Content>
                    <Message>
                        Current role of {this.props.userName} is : <Label color='blue'>{(this.props.currentRole).toUpperCase()}</Label>
                        <br />
                        Please select new one from following list and press 'Update' to change.
                    </Message>
                    <Form>
                        <Dropdown
                            placeholder='Select and click Update'
                            fluid
                            search
                            selection
                            clearable
                            options={this.props.systemRoles}
                            error={(!this.state.newRole) ? true : false}
                            onChange={(e, { value }) => { this.setState({ newRole: value }) }}
                            noResultsMessage='Loading Roles...'
                            value={this.state.newRole}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group size='mini'>
                        <Button onClick={this.closeModal}>Discard</Button>
                        <Button.Or />
                        <Button disabled={(this.state.newRole) ? false : true} type='submit' positive onClick={this.submit}>Update</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default Modal_ChangeAccessGroup;