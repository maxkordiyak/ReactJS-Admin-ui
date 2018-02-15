import React from 'react';
import { Route } from 'react-router-dom';
import PlacesListContainer from './containers/Places/List';
import PlacesDetailsContainer from './containers/Places/Details';
import NewPlaceContainer from './containers/New';

import ReportsListContainer from './containers/Reports/List';
import ReportsDetailsContainer from './containers/Reports/Details';

import RequestsListContainer from './containers/Requests/List';
import RequestsDetailsContainer from './containers/Requests/Details';

import LoginFormContainer from './containers/Login';
import { userIsAuthenticated, userIsNotAuthenticated } from './utils/auth';

export default ({ place }) => (
  [
      <Route key="create_place" exact path="/new/place" component={userIsAuthenticated(NewPlaceContainer)}></Route>,
      <Route key="places_list" exact path="/places" component={userIsAuthenticated(PlacesListContainer)}></Route>,
    <Route key="places_details" exact path="/places/:id" component={userIsAuthenticated(PlacesDetailsContainer)}></Route>,
    <Route key="login_form" exact path="/login" component={userIsNotAuthenticated(LoginFormContainer)}></Route>,
    <Route key="requests_list" exact path="/requests" component={userIsAuthenticated(RequestsListContainer)}></Route>,
    <Route key="requests_details" exact path="/requests/:id" component={userIsAuthenticated(RequestsDetailsContainer)}></Route>,
    <Route key="reports_list" exact path="/reports" component={userIsAuthenticated(ReportsListContainer)}></Route>,
    <Route key="reports_details" exact path="/reports/:id" component={userIsAuthenticated(ReportsDetailsContainer)}></Route>
  ]
);
