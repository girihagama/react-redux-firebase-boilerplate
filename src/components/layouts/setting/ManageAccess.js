import React, { Component } from 'react'
import { Segment, Header, Button, Table, Label, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

import { updateMemberAccess } from '../../../store/actions/settingAction';

import Loading from '../../../../src/resources/Loading.gif';

import Modal_ChangeAccess from './Modal_ChangeAccessGroup';

export class ShowRecords extends Component {
    state = {}

    navigateToCreateRecord = () => {
        this.props.history.push(allRoutes.section.create);
    }

    render() {     
        var { records } = this.props;

        /* console.log(this.props);
        console.log(this.state); */

        return (
            <Segment>
                <Header as='h5'>Records List</Header>

                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Current Role</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            records && records.map((record, index) => {
                                return (
                                    <Table.Row key={record.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{record.firstName} {record.lastName}</Table.Cell>
                                        <Table.Cell>{record.email} - </Table.Cell>
                                        <Table.Cell>
                                            <Label color='grey'>
                                                {(record.role.id).toUpperCase()}
                                            </Label>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <Popup content='Change Access Group' trigger={<Modal_ChangeAccess updateResult={this.props.setting} userId={record.id} currentRole={record.role.id} userName={`${record.firstName} ${record.lastName}`} userEmail={record.email} systemRoles={this.props.SystemRoles} updateMemberAccess={this.props.updateMemberAccess}/>} />
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                    {/* <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5'>
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.navigateToCreateRecord}>
                                    <Icon name='user' /> Add Record
                                                    </Button>
                                <Button size='small'>Approve Selected</Button>
                                <Button size='small'>Delete Selected</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer> */}

                </Table>

            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("STATE",state);

    //allRoles
    var SystemRoles = [];
    (state.firestore.ordered.SystemRoles && state.firestore.ordered.SystemRoles.map(val => {
        SystemRoles.push({ key: val.id, text: val.id, value: val.id });
    }));

    return {
        records: state.firestore.ordered.SystemUsers,
        SystemRoles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMemberAccess: (record) => dispatch(updateMemberAccess(record))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'users',
            includeDoc: true,
            storeAs: 'SystemUsers'
        },
        {
            collection: 'system_access_group',
            includeDoc: false,
            storeAs: 'SystemRoles'
        }
    ])
)(ShowRecords);


/*
Pending development

1. Dynamic pagination options
2. FSS
3. Action buttons

*/
