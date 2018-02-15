import { GET_REQUESTS_LIST, REQUEST_REQUESTS_LIST, GET_REQUEST, CREATE_REQUEST, REMOVE_REQUEST, SET_REQUESTS_FILTER, SET_REQUESTS_INDEX, SET_REQUESTS_LIMIT, SORT_REQUESTS_COLUMN, GET_CATEGORIES } from '../actions';

export default (state = { list: [], pagination: [], index: 1, limit: 20, isLoading: false, value: [{}], column: null, selectedRequest: [], allCategories: [] }, action) => {
    const { type, list, pagination, index, limit, value, column, request, categories, id } = action;

    switch (type) {
        case REQUEST_REQUESTS_LIST:
            return Object.assign({}, state, {
                isLoading: true
            })
        case GET_REQUESTS_LIST:
            return Object.assign({}, state, {
                list, pagination, isLoading: false
            })
        case SET_REQUESTS_FILTER:
            return Object.assign({}, state, {
                value,
                index: 1
            })
        case SET_REQUESTS_INDEX:
            return Object.assign({}, state, {
                index
            })
        case SET_REQUESTS_LIMIT:
            return Object.assign({}, state, {
                limit
            })
        case SORT_REQUESTS_COLUMN:
            return Object.assign({}, state, {
                column
            })
        case GET_REQUEST:
            return Object.assign({}, state, {
                selectedRequest: request
            })
        case GET_CATEGORIES:
            return Object.assign({}, state, {
                allCategories: categories
            })
        case CREATE_REQUEST:
            break;
        case REMOVE_REQUEST:
            return Object.assign({}, state, {
                list: state.list.filter(item => item._id != id)
            })
            break;
        default:
            return state;
    }
};
