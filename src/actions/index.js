// import axios from 'axios';
import { buildUrl } from '../utils/index.js';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const GET_PLACES_LIST = 'GET_PLACES_LIST';
export const REQUEST_PLACES_LIST = 'REQUEST_PLACES_LIST';
export const GET_PLACE = 'GET_PLACE';
export const SET_FILTER = 'SET_FILTER';
export const SET_INDEX = 'SET_INDEX';
export const SET_LIMIT = 'SET_LIMIT';
export const SORT_COLUMN = 'SORT_COLUMN';
export const CREATE_PLACE = 'CREATE_PLACE';
export const UPDATE_PLACE = 'UPDATE_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';

export const GET_REQUESTS_LIST = 'GET_REQUESTS_LIST';
export const REQUEST_REQUESTS_LIST = 'REQUEST_REQUESTS_LIST';
export const GET_REQUEST = 'GET_REQUEST';
export const SET_REQUESTS_FILTER = 'SET_REQUESTS_FILTER';
export const SET_REQUESTS_INDEX = 'SET_REQUESTS_INDEX';
export const SET_REQUESTS_LIMIT = 'SET_REQUESTS_LIMIT';
export const SORT_REQUESTS_COLUMN = 'SORT_REQUESTS_COLUMN';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const REMOVE_REQUEST = 'REMOVE_REQUEST';

export const GET_REPORTS_LIST = 'GET_REPORTS_LIST';
export const REQUEST_REPORTS_LIST = 'REQUEST_REPORTS_LIST';
export const GET_REPORT = 'GET_REPORT';
export const SET_REPORTS_FILTER = 'SET_REPORTS_FILTER';
export const SET_REPORTS_INDEX = 'SET_REPORTS_INDEX';
export const SET_REPORTS_LIMIT = 'SET_REPORTS_LIMIT';
export const SORT_REPORTS_COLUMN = 'SORT_REPORTS_COLUMN';
export const CREATE_REPORT = 'CREATE_REPORT';
export const REMOVE_REPORT = 'REMOVE_REPORT';

export const GET_CATEGORIES = 'GET_CATEGORIES';

function receiveCategories(json) {
  return {
    type: GET_CATEGORIES,
    categories: json
  };
}

export function getCategories() {
  const URL = "https://dev.recyclemap.org/api/categories";
  return (dispatch, getState) => {
    return fetch(URL, {
      method: "GET"
    }).then(response => response.json())
      .then(json => dispatch(receiveCategories(json)));
  }
}

export function login(data) {
  const URL = "https://dev.recyclemap.org/api/admin/login";
    return (dispatch, getState) => {
      return fetch(URL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          return Promise.reject(user);
        } else {
          localStorage.setItem('state', user);
          dispatch({ type: USER_LOGGED_IN, user })
        }
      })
      .catch(error => {
        const errorMessage = error.error;
        dispatch({ type: USER_LOGIN_ERROR, errorMessage })
        setTimeout(() => {
          dispatch({ type: USER_LOGIN_ERROR, errorMessage: "" })
        }, 2000);
      });
    };
}

export function logout() {
  return (dispatch, getState) => {
    const URL = "https://dev.recyclemap.org/api/admin/logout";
    return fetch(URL, {
      method: "GET"
    })
    .then(response => {
      dispatch({ type: USER_LOGGED_OUT })
      localStorage.removeItem('state');
    })
  };
}

function beginLoading() {
  return { type: REQUEST_PLACES_LIST };
}

function receivePlacesList(json) {
  return {
    type: GET_PLACES_LIST,
    list: json.data,
    pagination: json.pagination
  };
}

export function getPlacesList() {
  return (dispatch, getState) => {
    dispatch(beginLoading());
    const query = getState().place.value;
    const sort = getState().place.column;
    const params = {
      page: getState().place.index,
      limit: getState().place.limit,
      query: JSON.stringify(query),
      sort: JSON.stringify(sort)
    };
    const URL = "https://dev.recyclemap.org/api/admin/places";
    return fetch(buildUrl(URL, params), {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${getState().user.data.token}`
      }
    }).then(response => response.json())
      .then(json => dispatch(receivePlacesList(json)));
  }
}

export function setFilterStr(objectArray) {
  const filter = objectArray.map(element =>
    `"${element.id}":{"$regex":"${element.value}", "$options": "i"}`
  ).join(',');
  const wrappedFilter = `{${filter}}`;
  const stringifiedFilter = JSON.stringify(wrappedFilter); // getting rid of backslashes when sending query to server
  const json = JSON.parse(stringifiedFilter);
  const obj = JSON.parse(json);
  return { type: SET_FILTER, value: obj };
}

export function setPageIndex(index) {
  return { type: SET_INDEX, index };
}

export function setPageLimit(limit) {
  return { type: SET_LIMIT, limit };
}

export function sortColumn(sortArray) {
  const sort = sortArray.map(element =>
    `"${element.id}":"${element.desc ? "desc" : "asc"}"`
  ).join(',');
  const wrappedSort = `{${sort}}`;
  const stringifiedSort = JSON.stringify(wrappedSort); // getting rid of backslashes when sending query to server
  const jsonSort = JSON.parse(stringifiedSort);
  const objSort = JSON.parse(jsonSort);
  return { type: SORT_COLUMN, column: objSort };
}

function receivePlace(json) {
  return {
    type: GET_PLACE,
    place: json.data
  };
}

export function createPlace(data) {
    const URL = `https://dev.recyclemap.org/api/admin/places`;
    return (dispatch, getState) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().user.data.token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    };
}

export function getPlace(placeId) {
  return (dispatch, getState) => {
    dispatch(beginLoading());
    const URL = `https://dev.recyclemap.org/api/admin/places/${placeId}`;
    return fetch(URL, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${getState().user.data.token}`
      }
    }).then(response => response.json())
      .then(json => dispatch(receivePlace(json)));
  }
}

export function updatePlace(data) {
    const URL = `https://dev.recyclemap.org/api/admin/places/${data.id}`;
    return (dispatch, getState) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().user.data.token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    };
}

export function removePlace(placeId) {
    return (dispatch, getState) => {
        const URL = `https://dev.recyclemap.org/api/admin/places/${placeId}`;
        return fetch(URL, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getState().user.data.token}`
            }
        }).then(response => dispatch({ type: REMOVE_PLACE, placeId }));
    }
}

function receiveReportsList(json) {
  return {
    type: GET_REPORTS_LIST,
    list: json.data,
    pagination: json.pagination
  };
}

export function getReportsList() {
  return (dispatch, getState) => {
    const query = getState().report.value;
    const sort = getState().report.column;
    const params = {
      page: getState().report.index,
      limit: getState().report.limit,
      query: JSON.stringify(query),
      sort: JSON.stringify(sort)
    };
    const URL = "https://dev.recyclemap.org/api/admin/reports";
    return fetch(buildUrl(URL, params), {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${getState().user.data.token}`
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveReportsList(json)));
  }
}

export function setReportsFilterStr(objectArray) {
  const filter = objectArray.map(element =>
    `"${element.id}":{"$regex":"${element.value}", "$options": "i"}`
  ).join(',');
  const wrappedFilter = `{${filter}}`;
  const stringifiedFilter = JSON.stringify(wrappedFilter); // getting rid of backslashes when sending query to server
  const json = JSON.parse(stringifiedFilter);
  const obj = JSON.parse(json);
  return { type: SET_REPORTS_FILTER, value: obj };
}

export function setReportsPageIndex(index) {
  return { type: SET_REPORTS_INDEX, index };
}

export function setReportsPageLimit(limit) {
  return { type: SET_REPORTS_LIMIT, limit };
}

export function sortReportsColumn(sortArray) {
  const sort = sortArray.map(element =>
    `"${element.id}":"${element.desc ? "desc" : "asc"}"`
  ).join(',');
  const wrappedSort = `{${sort}}`;
  const stringifiedSort = JSON.stringify(wrappedSort); // getting rid of backslashes when sending query to server
  const jsonSort = JSON.parse(stringifiedSort);
  const objSort = JSON.parse(jsonSort);
  return { type: SORT_REPORTS_COLUMN, column: objSort };
}

function receiveReport(json) {
  return {
    type: GET_REPORT,
    report: json.data
  };
}

export function removeReport(reportId) {
    return (dispatch, getState) => {
        const URL = `https://dev.recyclemap.org/api/admin/reports/${reportId}`;
        return fetch(URL, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getState().user.data.token}`
            }
        }).then(response => dispatch({ type: REMOVE_REPORT, reportId }));
    }
}


export function getReport(reportId) {
  return (dispatch, getState) => {
    dispatch(beginLoading());
    const URL = `https://dev.recyclemap.org/api/admin/reports/${reportId}`;
    return fetch(URL, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${getState().user.data.token}`
      }
    }).then(response => response.json())
      .then(json => dispatch(receiveReport(json)));
  }
}

function receiveRequestsList(json) {
    return {
        type: GET_REQUESTS_LIST,
        list: json.data,
        pagination: json.pagination
    };
}

export function getRequestsList() {
    return (dispatch, getState) => {
        const query = getState().request.value;
        const sort = getState().request.column;
        const params = {
            page: getState().request.index,
            limit: getState().request.limit,
            query: JSON.stringify(query),
            sort: JSON.stringify(sort)
        };
        const URL = "https://dev.recyclemap.org/api/admin/requests";
        return fetch(buildUrl(URL, params), {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${getState().user.data.token}`
            }
        }).then(response => response.json())
            .then(json => dispatch(receiveRequestsList(json)));
    }
}

export function setRequestsFilterStr(objectArray) {
    const filter = objectArray.map(element =>
        `"${element.id}":{"$regex":"${element.value}", "$options": "i"}`
    ).join(',');
    const wrappedFilter = `{${filter}}`;
    const stringifiedFilter = JSON.stringify(wrappedFilter); // getting rid of backslashes when sending query to server
    const json = JSON.parse(stringifiedFilter);
    const obj = JSON.parse(json);
    return { type: SET_REQUESTS_FILTER, value: obj };
}

export function setRequestsPageIndex(index) {
    return { type: SET_REQUESTS_INDEX, index };
}

export function setRequestsPageLimit(limit) {
    return { type: SET_REQUESTS_LIMIT, limit };
}

export function sortRequestsColumn(sortArray) {
    const sort = sortArray.map(element =>
        `"${element.id}":"${element.desc ? "desc" : "asc"}"`
    ).join(',');
    const wrappedSort = `{${sort}}`;
    const stringifiedSort = JSON.stringify(wrappedSort); // getting rid of backslashes when sending query to server
    const jsonSort = JSON.parse(stringifiedSort);
    const objSort = JSON.parse(jsonSort);
    return { type: SORT_REQUESTS_COLUMN, column: objSort };
}

function receiveRequest(json) {
    return {
        type: GET_REQUEST,
        request: json.data
    };
}

export function getRequest(requestId) {
    return (dispatch, getState) => {
        dispatch(beginLoading());
        const URL = `https://dev.recyclemap.org/api/admin/requests/${requestId}`;
        return fetch(URL, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${getState().user.data.token}`
            }
        }).then(response => response.json())
            .then(json => dispatch(receiveRequest(json)));
    }
}

export function approveRequest(data) {
    const URL = `https://dev.recyclemap.org/api/admin/requests/${data.id}/approve`;
    return (dispatch, getState) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().user.data.token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    };
}

export function removeRequest(requestId) {
    return (dispatch, getState) => {
        const URL = `https://dev.recyclemap.org/api/admin/requests/${requestId}`;
        return fetch(URL, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getState().user.data.token}`
            }
        }).then(response => dispatch({ type: REMOVE_REQUEST, requestId }));
    }
}

