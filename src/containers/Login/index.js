import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/Login';
import { login } from '../../actions';

class LoginFormContainer extends Component {
  render() {
    return (
      <LoginForm login={this.props.login} errorMessage={this.props.errorMessage}/>
    );
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

const mapStateToProps = (state) => ({
  user: state.user,
  errorMessage: state.user.errorMessage
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer));
