import React, { Component } from 'react'
import { Segment, Header, Button, Checkbox, List, Input, Dropdown, Accordion, Icon, Message } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

import { loadAccessGroup, createAccessGroup, updateAccessGroup } from '../../../store/actions/settingAction';

import Loading from '../../../../src/resources/Loading.gif';

export class ManageRole extends Component {
    constructor(props) {
        super(props);
        this.roleNameInput = React.createRef();
    }

    state = {
        activeIndex: -1,
        selectedRole: "",
        activeAction: null, //null, create, update
        activeActionName: 'Active Role',
        activeActionPlacceholder: 'None',
        roleName: '',
        allAccess: null
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
            this.loadSelectedRole(value);
        }
    }

    loadSelectedRole(role) {
        this.props.loadAccessGroup({ roleName: role, template: this.state.allAccess });
    }

    checkedChanged(MainSection, SubSection) {
        var data = null;
        //console.log(MainSection, SubSection);
        if (this.state.allAccess !== null) {
            data = this.state.allAccess;
            var current = data[MainSection][SubSection];
            data[MainSection][SubSection] = !current;
            this.setState({ allAccess: data });
        } else {
            data = this.props.AccessTemplate;
            data[MainSection][SubSection] = true;
            this.setState({ allAccess: data });
        }
    }

    submitChanges() {
        //console.log("changes", this.state);
        if (this.state.activeAction == "create") {
            this.createNew(this.state.allAccess, this.state.roleName);
        } else if (this.state.activeAction == "update") {
            this.updateExisting(this.state.allAccess, this.state.selectedRole);
        }
    }

    createNew(record, name) {
        if (this.name) {
            this.props.createAccessGroup({ record, name });
        } else {
            this.roleNameInput.current.focus();
        }
    }

    updateExisting(record, name) {
        this.props.updateAccessGroup({ record, name });
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /*----------- Life Cycle -------------*/
    componentDidUpdate() {
        if (this.state.allAccess == null && !this.isEmpty(this.props.AccessTemplate)) {
            this.setState({
                allAccess: this.props.AccessTemplate
            });
        }
    }
    /*----------- Life Cycle -------------*/

    render() {
        const { activeIndex } = this.state;

        console.log("Props", this.props);
        console.log("State", this.state);
        var subSections = [];

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
                                ref={this.roleNameInput}
                                placeholder={this.state.activeActionPlacceholder}
                                disabled={(this.state.activeAction && this.state.activeAction === 'create') ? false : true}
                                floated='left'
                                error={((this.state.roleName === "" && this.state.activeAction === "create") || (this.state.selectedRole === "" && this.state.activeAction === "update")) ? true : false}
                                value={this.state.roleName}
                                onChange={(e) => {
                                    var roleName = (e.target.value).replace(/[^A-Z0-9]+/ig, "");
                                    roleName = roleName.charAt(0).toLowerCase() + roleName.slice(1);
                                    this.setState({ roleName });
                                }}
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
                        (this.state.allAccess && (this.state.activeAction !== 'create' && this.state.activeAction !== 'update'))
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
                            (this.props.AccessControlTemplate)
                                ?
                                <Accordion fluid styled /* activeIndex={-1} */>
                                    {
                                        this.props.AccessControlTemplate.map((sectionData, ind) => {
                                            return (
                                                <div key={ind}>
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

                                                                    var value = false;
                                                                    var sd = sectionData.id;
                                                                    var ssd = subSectionData[0];
                                                                    var ssv = subSectionData[1];

                                                                    if (this.state.allAccess !== {} && this.state.allAccess[sd][ssd]) {
                                                                        value = this.state.allAccess[sd][ssd];
                                                                    }

                                                                    return (
                                                                        <List.Item key={index} style={{ 'overflow': 'hidden' }}>
                                                                            <List.Content style={{ 'padding': '10px' }}>
                                                                                <Checkbox /* defaultChecked={false} */ checked={value} key={sectionData.id, subSectionData[0]} label={subSectionData[0]} onChange={(e) => {
                                                                                    this.checkedChanged(sectionData.id, subSectionData[0]);
                                                                                }} />
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
                                : ""
                    }
                </div>

                {
                    (this.state.activeAction && !this.isEmpty(this.state.allAccess) && (this.state.activeAction === 'create' || this.state.activeAction === 'update'))
                        ?
                        <div>
                            <br />
                            <Button.Group floated='right'>
                                <Button onClick={() => { this.setState({ activeAction: null, activeActionName: 'Active Role', activeActionPlacceholder: 'None', selectedRole: '' }) }}>Discard</Button>
                                <Button.Or />
                                <Button positive onClick={(this.submitChanges).bind(this)}>Save</Button>
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

    var accessTemplate = {}
    if (state.firestore.ordered.AccessControlTemplate) {
        (state.firestore.ordered.AccessControlTemplate).map(level1 => {
            accessTemplate[level1.id] = {}
            Object.keys(level1).forEach(function (key) {
                if (key !== 'id') {
                    //console.log(key, level1[key]);
                    accessTemplate[level1.id][key] = level1[key];
                }
            });
        })
    }

    var accessRoles = [];
    if (state.firestore.ordered.CurrentAccessRoles) {
        (state.firestore.ordered.CurrentAccessRoles).map(value => {
            accessRoles.push({ key: value.id, text: value.id, value: value.id });
        });
    }

    return {
        AccessControlTemplate: state.firestore.ordered.AccessControlTemplate,
        CurrentAccessRoles: accessRoles,
        AccessTemplate: accessTemplate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAccessGroup: (record) => dispatch(loadAccessGroup(record)),
        createAccessGroup: (record) => dispatch(createAccessGroup(record)),
        updateAccessGroup: (record) => dispatch(updateAccessGroup(record)),
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
)(ManageRole);