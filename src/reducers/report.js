import { GET_REPORTS_LIST, REQUEST_REPORTS_LIST, GET_REPORT, CREATE_REPORT, REMOVE_REPORT, SET_REPORTS_FILTER, SET_REPORTS_INDEX, SET_REPORTS_LIMIT, SORT_REPORTS_COLUMN } from '../actions';

export default (state = { list: [], pagination: [], index: 1, limit: 20, isLoading: false, value: [{}], column: null, selectedReport: []}, action) => {
  const { type, list, pagination, index, limit, value, column, report, id } = action;

  switch (type) {
  case REQUEST_REPORTS_LIST:
    return Object.assign({}, state, {
      isLoading: true
    })
  case GET_REPORTS_LIST:
    return Object.assign({}, state, {
      list, pagination, isLoading: false
    })
  case SET_REPORTS_FILTER:
    return Object.assign({}, state, {
      value,
      index: 1
    })
  case SET_REPORTS_INDEX:
    return Object.assign({}, state, {
      index
    })
  case SET_REPORTS_LIMIT:
    return Object.assign({}, state, {
      limit
    })
  case SORT_REPORTS_COLUMN:
    return Object.assign({}, state, {
      column
    })
  case GET_REPORT:
    return Object.assign({}, state, {
      selectedReport: report
    })
  case CREATE_REPORT:
    break;
  case REMOVE_REPORT:
    return Object.assign({}, state, {
        list: state.list.filter(item => item._id != id)
    })
    break;
  default:
    return state;
  }
};
