import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Cell, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import logo from './img/logo.svg';
import Nav from './components/Nav';
import Routes from './Routes';
import { login, logout } from './actions';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Toolbar className="main-toolbar">
          <ToolbarRow className="main-toolbarRow">
            <ToolbarSection className="main-toolbarSection" align="start">
              <Link to="/places">
                <img className="logo" src={logo} alt="RecycleMap.org Logo"/>
              </Link>
            </ToolbarSection>
            <ToolbarSection className="main-toolbarSection" align="end">
              <Nav logout={this.props.logout}
              isAuthenticated={this.props.isAuthenticated}/>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <main>
          <Grid className="centered-grid">
            <Cell col={12}>
              <Routes/>
            </Cell>
          </Grid>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
