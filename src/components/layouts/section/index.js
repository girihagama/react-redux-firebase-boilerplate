import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import SideNav from '../../common/SideNav';
import { sectionNavConfig } from '../../../config/navConfig';

import CreateRecord from './CreateRecord';
import ShowRecords from './ShowRecords';

export class Section extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <SideNav sideNavConfig={sectionNavConfig} />
        </Grid.Column>

        <Grid.Column stretched width={13}>
          <Switch>
            <Route path='/section/create' component={CreateRecord} />
            <Route path='/section/show' render={(props => <ShowRecords {...props} uid={this.props.Access.uid} access_role={this.props.Access.role} />)} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log("STATE", state);
  return {
    Access: {
      uid: state.firebase.auth.uid,
      role: (state.firestore.data.current_user) ? state.firestore.data.current_user.role.id : "guest"
    }
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      storeAs: 'current_user'
    }
  ])
)(Section);