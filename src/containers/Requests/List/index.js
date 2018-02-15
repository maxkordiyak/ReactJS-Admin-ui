import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRequestsList, setRequestsPageIndex, setRequestsPageLimit, setRequestsFilterStr, sortRequestsColumn, getRequest } from '../../../actions';
import RequestsList from '../../../components/Requests/List';

class RequestsListContainer extends Component {
    componentDidMount() {
        this.props.getRequestsList()
    }

    goToRequestById(id) {
        if (!id) { return false; }
        this.props.history.push(`/requests/${id}`);
    }

    render() {
        return (
            <RequestsList requests={this.props.list}
                         pagination={this.props.pagination}
                         isLoading={this.props.isLoading}
                         getRequestsList={this.props.getRequestsList}
                         setRequestsPageIndex={this.props.setRequestsPageIndex}
                         setRequestsPageLimit={this.props.setRequestsPageLimit}
                         setRequestsFilterStr={this.props.setRequestsFilterStr}
                         sortRequestsColumn={this.props.sortRequestsColumn}
                          goToRequest={(id) => this.goToRequestById(id)}/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRequestsList: () => dispatch(getRequestsList()),
        setRequestsPageIndex: index => { console.log(index); dispatch(setRequestsPageIndex(index)) },
        setRequestsPageLimit: limit => dispatch(setRequestsPageLimit(limit)),
        setRequestsFilterStr: value => dispatch(setRequestsFilterStr(value)),
        sortRequestsColumn: column => dispatch(sortRequestsColumn(column))
    };
};

const mapStateToProps = (state) => ({
    list: state.request.list,
    isLoading: state.request.isLoading,
    pagination: state.request.pagination
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestsListContainer));
