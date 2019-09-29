import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import SideNav from '../../common/SideNav';
import { settingNavConfig } from '../../../config/navConfig';

import AccessControlTemplate from './AccessControlTemplate';
import ManageRole from './ManageRole';
import ManageAccess from './ManageAccess';
/* import ShowRecords from './ShowRecords'; */

export class Section extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <SideNav sideNavConfig={settingNavConfig} />
        </Grid.Column>

        <Grid.Column stretched width={13}>
          <Switch>
            <Route path='/setting/accessManagement' render={(props => <ManageAccess uid={this.props.Access.uid} access_role={this.props.Access.role} />)} />
            <Route path='/setting/roleManagement' render={(props => <ManageRole uid={this.props.Access.uid} access_role={this.props.Access.role} />)} />
            <Route path='/setting/accessControlTemplate' render={(props => <AccessControlTemplate uid={this.props.Access.uid} access_role={this.props.Access.role} />)} />
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