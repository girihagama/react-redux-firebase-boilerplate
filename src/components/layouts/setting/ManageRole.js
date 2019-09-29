import React, { Component } from 'react'
import { Segment, Header, Button, Checkbox, List, Input, Dropdown, Accordion, Icon, Message } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

import Loading from '../../../../src/resources/Loading.gif';

export class ShowRecords extends Component {
    state = {
        activeIndex: -1,
        selectedRole: "",
        activeAction: null, //null, create, update
        activeActionName: 'Active Role',
        activeActionPlacceholder: 'None',
        allAccess: {
            a: {
                b: true
            }
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    navigateToCreateRecord = () => {
        this.props.history.push(allRoutes.section.create);
    }

    addNewRole() {
        console.log('clicked');
        this.setState({
            activeAction: 'create',
            activeActionName: 'Role Name',
            activeActionPlacceholder: 'Provde a name',
        });
    }

    selectedRole = (e, { value }) => {
        if (value === "") {
            this.setState({
                selectedRole: "",
                activeAction: null,
                activeActionName: 'Active Role',
                activeActionPlacceholder: 'None'
            });
        } else {
            this.setState({
                selectedRole: value,
                activeAction: 'update',
                activeActionName: 'Editing Role',
                activeActionPlacceholder: value
            });
        }
    }

    toggle(a, b) {
        console.log(a, b);
    }

    render() {
        const { activeIndex } = this.state
        console.log(this.props);
        console.log(this.state);
        var subSections = [];

        var temp = [];

        const { records } = this.props;
        return (
            <Segment>
                <Header as='h5'>Manage Role</Header>

                <div>
                    {// Name input or editing indicatior 
                        (this.state.activeAction === 'create' || this.state.activeAction === 'update')
                            ?
                            <Input
                                label={{ basic: true, content: this.state.activeActionName }}
                                labelPosition='left'
                                size='small'
                                placeholder={this.state.activeActionPlacceholder}
                                disabled={(this.state.activeAction && this.state.activeAction === 'create') ? false : true}
                                floated='left'
                                error={false}
                            />
                            : ""
                    }

                    { //cancel editing
                        (this.state.activeAction === 'update')
                            ?
                            <Button style={{ backgroundColor: 'white' }} circular animated size='small' onClick={() => { this.setState({ activeAction: null, activeActionName: 'Active Role', activeActionPlacceholder: 'None', selectedRole: '' }) }}>
                                <Button.Content visible>Clear</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='close' />
                                </Button.Content>
                            </Button>
                            : ""
                    }

                    { //profile selection dropdown
                        (this.state.activeAction !== 'create')
                            ?
                            (this.props.CurrentAccessRoles && this.state.activeAction !== 'update')
                                ?//current access role list loaded                                                               
                                < Dropdown
                                    placeholder='Load Existing Role'
                                    search
                                    disabled={false}
                                    selection
                                    //clearable
                                    options={this.props.CurrentAccessRoles}
                                    floated='left'
                                    size='small'
                                    onChange={this.selectedRole}
                                    noResultsMessage='Loading Results...'
                                    value={this.state.selectedRole}
                                />
                                : "" //current access role list not yet loaded

                            : ""
                    }

                    {
                        (this.state.activeAction !== 'create' && this.state.activeAction !== 'update')
                            ?
                            <Button animated='fade' color='blue' size='small' floated='right' onClick={this.addNewRole.bind(this)}>
                                <Button.Content visible>Add New Role</Button.Content>
                                <Button.Content hidden><Icon name='plus' /></Button.Content>
                            </Button>
                            :
                            <Button animated='fade' disabled color='blue' size='small' floated='right' onClick={this.addNewRole.bind(this)}>
                                <Button.Content visible>Add New Role</Button.Content>
                                <Button.Content hidden><Icon name='plus' /></Button.Content>
                            </Button>
                    }
                </div>

                {
                    (this.state.activeAction && this.state.activeAction === 'create')
                        ?
                        <Message>
                            <Message.Header>Tips for create new role</Message.Header>
                            <Message.List>
                                <Message.Item>Role name must be unique</Message.Item>
                                <Message.Item>Role name must be a lowercase word</Message.Item>
                                <Message.Item>Role name must not include spaces or special characters</Message.Item>
                            </Message.List>
                        </Message>
                        : ""
                }

                <div style={{ paddingTop: '10px' }}>
                    {
                        (!this.state.activeAction)
                            ?
                            <center>
                                <br />
                                <h3>Please click
                                    <span style={{ border: 'solid 1px rgba(0, 0, 0, 0.2)', padding: '5px', borderRadius: '5px', backgroundColor: 'silver', opacity: '0.8', margin: '0px 5px 0px 5px' }}>Add New Role</span>
                                    or select one from
                                    <span style={{ border: 'solid 1px rgba(0, 0, 0, 0.2)', padding: '5px', borderRadius: '5px', backgroundColor: 'silver', opacity: '0.8', margin: '0px 5px 0px 5px' }}>Load Existing Role</span>                                    to update.</h3>
                            </center>
                            :
                            <Accordion fluid styled activeIndex={-1}>
                                {
                                    this.props.AccessControlTemplate.map((sectionData, ind) => {
                                        return (
                                            <div>
                                                <Accordion.Title
                                                    active={activeIndex === ind}
                                                    index={ind}
                                                    onClick={this.handleClick}
                                                >
                                                    <Icon name='dropdown' />
                                                    {sectionData.id}
                                                </Accordion.Title>
                                                <Accordion.Content key={ind} active={activeIndex === ind} style={{ 'overflow': 'hidden' }}>
                                                    {/* accordian content */}

                                                    <List relaxed verticalAlign='middle' size='mini'>
                                                        {
                                                            subSections = [],
                                                            Object.keys(sectionData).forEach(function (key) {
                                                                if (key !== 'id') {
                                                                    subSections.push([key, sectionData[key]]);
                                                                }
                                                            }),
                                                            //console.log({orderedValues}),
                                                            subSections.map((subSectionData, index) => {
                                                                return (
                                                                    <List.Item key={index} style={{ 'overflow': 'hidden' }}>
                                                                        <List.Content style={{ 'padding': '10px' }}>
                                                                            <Checkbox key={sectionData.id, subSectionData[0]} label={subSectionData[0]} onChange={this.toggle(sectionData.id, subSectionData[0])} />
                                                                        </List.Content>
                                                                    </List.Item>
                                                                )
                                                            })
                                                        }
                                                    </List>

                                                </Accordion.Content>
                                            </div>
                                        )
                                    })
                                }
                            </Accordion>

                    }
                </div>

                {
                    (this.state.activeAction && (this.state.activeAction === 'create' || this.state.activeAction === 'update'))
                        ?
                        <div>
                            <br />
                            <Button.Group floated='right'>
                                <Button onClick={() => { this.setState({ activeAction: null, activeActionName: 'Active Role', activeActionPlacceholder: 'None', selectedRole: '' }) }}>Discard</Button>
                                <Button.Or />
                                <Button positive>Save</Button>
                            </Button.Group>
                        </div>
                        : ""
                }

            </Segment >
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("STATE",state);

    var accessRoles = [];
    if (state.firestore.ordered.CurrentAccessRoles) {
        (state.firestore.ordered.CurrentAccessRoles).map(value => {
            accessRoles.push({ key: value.id, text: value.id, value: value.id });
        });
    }

    return {
        AccessControlTemplate: state.firestore.ordered.AccessControlTemplate,
        CurrentAccessRoles: accessRoles
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
            collection: 'system_access_control',
            includeDoc: true,
            storeAs: 'AccessControlTemplate'
        },
        {
            collection: 'system_access_group',
            storeAs: 'CurrentAccessRoles'
        }
    ])
)(ShowRecords);


/*
Pending development

1. Dynamic pagination options
2. FSS
3. Action buttons

*/
