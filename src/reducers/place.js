import { GET_PLACES_LIST, REQUEST_PLACES_LIST, GET_PLACE, CREATE_PLACE, UPDATE_PLACE, REMOVE_PLACE, SET_FILTER, SET_INDEX, SET_LIMIT, SORT_COLUMN, GET_CATEGORIES } from '../actions';

export default (state = { list: [], pagination: [], index: 1, limit: 20, isLoading: false, value: [{}], column: null, selectedPlace: [], allCategories: [] }, action) => {
  const { type, list, pagination, index, limit, value, column, place, categories, id } = action;

  switch (type) {
  case REQUEST_PLACES_LIST:
    return Object.assign({}, state, {
      isLoading: true
    })
  case GET_PLACES_LIST:
    return Object.assign({}, state, {
      list, pagination, isLoading: false
    })
  case SET_FILTER:
    return Object.assign({}, state, {
      value,
      index: 1
    })
  case SET_INDEX:
    return Object.assign({}, state, {
      index
    })
  case SET_LIMIT:
    return Object.assign({}, state, {
      limit
    })
  case SORT_COLUMN:
    return Object.assign({}, state, {
      column
    })
  case GET_PLACE:
    return Object.assign({}, state, {
      selectedPlace: place
    })
  case GET_CATEGORIES:
    return Object.assign({}, state, {
      allCategories: categories
    })
  case CREATE_PLACE:

    break;
  case UPDATE_PLACE:
    return Object.assign({}, state, {
      list: state.list
    })
  case REMOVE_PLACE:
    return Object.assign({}, state, {
        list: state.list.filter(item => item._id != id)
    })
    break;
  default:
    return state;
  }
};
