//Core imports
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux';

//Main navigation releated imports
import MainNav from './components/common/MainNav';
import { MainNavConfig } from './config/navConfig';

//Layout imports
import Dashboard from './components/layouts/dashboard';
import Section from './components/layouts/section'
import Setting from './components/layouts/setting'

class App extends Component {

  render() {
    //Protectig the component to prevent access without login
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container>
        <MainNav MainNavConfig={MainNavConfig} />
        {/* Define all main app components here */}
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/section' render={(props => <Section {...props} uid={this.props.auth.uid} />)} />
          <Route path='/setting' render={(props => <Setting {...props} uid={this.props.auth.uid} />)} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Main", state);
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
