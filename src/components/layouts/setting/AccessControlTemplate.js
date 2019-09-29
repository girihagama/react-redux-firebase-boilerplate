import React, { Component } from 'react'
import { Segment, Header, Button, Checkbox, Accordion, Form, Input, Icon, List, Image } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

import Loading from '../../../../src/resources/Loading.gif';

export class AccessControlTemplate extends Component {
    state = { activeIndex: 0 }

    navigateToCreateRecord = () => {
        this.props.history.push(allRoutes.section.create);
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        console.log(this.props);
        const { activeIndex } = this.state
        var orderedValues = [];

        return (
            <Segment>
                <Header as='h5'>Access Conrol Template</Header>

                {
                    (this.props.AccessControlTemplate)
                        ? //sectionData Loaded
                        <Accordion fluid styled>
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
                                            <Accordion.Content active={activeIndex === ind} style={{ 'overflow': 'hidden', 'paddingBottom': '0px' }}>
                                                {/* accordian content */}

                                                <List divided verticalAlign='middle' size='mini'>
                                                    {
                                                        orderedValues = [],
                                                        Object.keys(sectionData).forEach(function (key) {
                                                            if (key !== 'id') {
                                                                orderedValues.push([key, sectionData[key]]);
                                                            }
                                                        }),
                                                        //console.log({orderedValues}),
                                                        orderedValues.map((subSectionData, index) => {
                                                            return (
                                                                <List.Item style={{'overflow': 'hidden'}}>
                                                                    <List.Content floated='right' style={{'padding':'0px'}}>
                                                                        <Button.Group size='mini'>
                                                                            <Button>Edit</Button>
                                                                            <Button>Delete</Button>
                                                                        </Button.Group>
                                                                    </List.Content>
                                                                    <List.Content style={{'padding':'0px'}}>
                                                                        <h5 style={{'color':'blue'}}>{subSectionData[0]}</h5>
                                                                    </List.Content>
                                                                </List.Item>
                                                            )
                                                        })
                                                    }
                                                </List>

                                                <hr />

                                                <div style={{ 'color': 'silver', 'padding': '10px' }}>
                                                    <Form style={{ 'float': 'left' }}>
                                                        <Form.Group inline widths='16'>
                                                            <Form.Field>
                                                                <label>Access Name</label>
                                                                <Input size='mini' required placeholder='New access name' />
                                                            </Form.Field>
                                                            <Form.Field>
                                                                <Button type='submit' size='mini' color='blue'>Submit</Button>
                                                            </Form.Field>
                                                        </Form.Group>
                                                    </Form>

                                                    <Button.Group floated='right' size='mini' color='red'>
                                                        <Button>Delete: {sectionData.id}</Button>
                                                    </Button.Group>
                                                </div>
                                            </Accordion.Content>
                                        </div>
                                    )
                                })
                            }

                            {/* Add New */}
                            <Accordion.Title
                                active={activeIndex === this.props.AccessControlTemplate.length + 1}
                                index={this.props.AccessControlTemplate.length + 1}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                <b style={{ "color": "red" }}>ADD NEW (<Icon name='add' />)</b>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === this.props.AccessControlTemplate.length + 1}>
                                <Form>
                                    <Form.Group inline widths='16'>
                                        <Form.Field>
                                            <label>Section Name</label>
                                            <Input required placeholder='New section name' />
                                        </Form.Field>
                                        <Form.Field>
                                            <Button type='submit' color='blue'>Submit</Button>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Accordion.Content>

                        </Accordion>
                        : //Loading sectionData
                        <center>
                            <img style={{ "margin": "10px" }} src={Loading} alt="Loading" width="50" /><br />Loading
                        </center>
                }

            </Segment >
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("STATE",state);
    return {
        AccessControlTemplate: state.firestore.ordered.AccessControlTemplate
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
        }
    ])
)(AccessControlTemplate);


/*
Pending development

1. Dynamic pagination options
2. FSS
3. Action buttons

*/
