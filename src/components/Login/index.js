import React, { Component } from 'react';
import { Grid, Cell, Button, Textfield, Card, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from "react-mdc-web/lib";
import { login } from '../../actions'

import './index.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    let username, password;
    e.preventDefault();
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    let username, password;
    let errorMsg = null;
    if (this.props.errorMessage) {
      errorMsg = <div className="login-errorMessage">{this.props.errorMessage}</div>;
    };

    return(
      <Grid>
        <Cell col={4}></Cell>
        <Cell col={4}>
          <form className="login-form">
            <Card>
              <Toolbar className="login-toolbar">
                <ToolbarRow>
                  <ToolbarSection align="start">
                    <ToolbarTitle className="login-title">Log in as administrator</ToolbarTitle>
                  </ToolbarSection>
                </ToolbarRow>
              </Toolbar>
              <div>
                <Textfield className="login-textfield" type="text"
                floatingLabel="Username"
                name="username"
                value={this.state.username}
                onChange={({target : {value : username}}) => {
                  this.setState({ username })
                }}
                />
              </div>
              <div>
                <Textfield className="login-textfield" type="password"
                floatingLabel="Password"
                name="password"
                value={this.state.password}
                onChange={({target : {value : password}}) => {
                  this.setState({ password })
                }}
                />
              </div>
              {errorMsg}
              <Button className="login-button" compact onClick={this.onClick}>Login</Button>
            </Card>
          </form>
        </Cell>
        <Cell col={4}></Cell>
      </Grid>
    )
  }
};

export default LoginForm;
