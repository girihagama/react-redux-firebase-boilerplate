import React, { Component } from 'react'
import { Segment, Header, Button, Checkbox, Icon, Table, Menu, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

import Loading from '../../../../src/resources/Loading.gif';

export class ShowRecords extends Component {
    navigateToCreateRecord = () => {
        this.props.history.push(allRoutes.section.create);
    }

    render() {
        console.log(this.props);
        var SectionAccess = (this.props.SectionAccess) ? this.props.SectionAccess : null;

        const { records } = this.props;
        return (
            <Segment>
                <Header as='h5'>Records List</Header>

                {
                    (SectionAccess)
                        ? //SectionAccess available

                        (SectionAccess.read)
                            ? //read permission true
                            <Table compact celled definition={(SectionAccess.multi_select)}>
                                <Table.Header>
                                    <Table.Row>
                                        { //multi_select
                                            (SectionAccess.multi_select)
                                                ?
                                                <Table.HeaderCell />
                                                : ""
                                        }
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Gender</Table.HeaderCell>
                                        <Table.HeaderCell>Size</Table.HeaderCell>
                                        <Table.HeaderCell>About</Table.HeaderCell>
                                        <Table.HeaderCell>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        records && records.map((record) => {
                                            var size = '';
                                            switch (record.size) {
                                                case 'sm':
                                                    size = 'Small';
                                                    break;
                                                case 'md':
                                                    size = 'Medium';
                                                    break;
                                                case 'lg':
                                                    size = 'Large';
                                                    break;
                                                default:
                                                    break;
                                            }
                                            return (
                                                <Table.Row key={record.id}>
                                                    { //multi_select
                                                        (SectionAccess.multi_select)
                                                            ?
                                                            <Table.Cell collapsing>
                                                                <Checkbox slider />
                                                            </Table.Cell>
                                                            : ""
                                                    }
                                                    <Table.Cell>{record.firstName} {record.lastName}</Table.Cell>
                                                    <Table.Cell>{record.gender}</Table.Cell>
                                                    <Table.Cell>{size}</Table.Cell>
                                                    <Table.Cell>{record.about}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button.Group>
                                                            { //update
                                                                (SectionAccess.update)
                                                                    ?
                                                                    <Popup trigger={<Button compact icon><Icon name='check' /></Button>}>Approve</Popup>
                                                                    : ""
                                                            }
                                                            { //read
                                                                (SectionAccess.read)
                                                                    ?
                                                                    <Popup trigger={<Button compact icon><Icon name='file' /></Button>}>View</Popup>
                                                                    : ""
                                                            }
                                                            { //update
                                                                (SectionAccess.update)
                                                                    ?
                                                                    <Popup trigger={<Button compact icon><Icon name='edit' /></Button>}>Edit</Popup>
                                                                    : ""
                                                            }
                                                            { //delete
                                                                (SectionAccess.delete)
                                                                    ?
                                                                    <Popup trigger={<Button compact icon><Icon name='trash' /></Button>}>Delete</Popup>
                                                                    : ""
                                                            }
                                                        </Button.Group>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>

                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell colSpan='5'>
                                            { //create
                                                (SectionAccess.create)
                                                    ?
                                                    <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.navigateToCreateRecord}>
                                                        <Icon name='user' /> Add Record
                                                    </Button>
                                                    : ""
                                            }
                                            { //update
                                                (SectionAccess.update && SectionAccess.multi_select)
                                                    ?
                                                    <Button size='small'>Approve Selected</Button>
                                                    : ""
                                            }
                                            { //delete
                                                (SectionAccess.delete && SectionAccess.multi_select)
                                                    ?
                                                    <Button size='small'>Delete Selected</Button>
                                                    : ""
                                            }
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
                                </Table.Footer>
                            </Table>
                            : //read permission false
                            ""

                        : //SectionAccess not available
                        <center>
                            <img style={{ "margin": "10px" }} src={Loading} alt="Loading" width="50" /><br />Loading
                        </center>
                }

            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("STATE",state);
    return {
        records: state.firestore.ordered.records,
        SectionAccess: state.firestore.data.SectionAccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'records',
        },
        {
            collection: 'system_access_group',
            doc: props.access_role,
            includeDoc: true,
            subcollections: [{ collection: 'system_access_control', doc: 'section' }],
            storeAs: 'SectionAccess'
        }
    ])
)(ShowRecords);


/*
Pending development

1. Dynamic pagination options
2. FSS
3. Action buttons

*/
