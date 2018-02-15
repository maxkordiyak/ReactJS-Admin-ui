import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRequest, getCategories, removeRequest, approveRequest } from '../../../actions';
import RequestsDetails from '../../../components/Requests/Details';

class RequestsDetailsContainer extends Component {
    componentDidMount() {
        this.props.getRequestDetails(this.props.match.params.id);
        this.props.getCategories();
    }

    removeRequest(id) {
        if (!id) { return false; }
        this.props.history.push('/requests')
        this.props.removeRequest(id)
    }

    approveRequest(data) {
        if (!data) { return false; }
        this.props.history.push('/requests')
        this.props.approveRequest(data)
    }

    render() {
        return (
            <RequestsDetails request={this.props.selectedRequest}
                             allCategories={this.props.allCategories}
                             removeRequest={(id) => this.removeRequest(id)}
                             approveRequest={(data) => this.approveRequest(data)}/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRequestDetails: id => dispatch(getRequest(id)),
        getCategories: () => dispatch(getCategories()),
        removeRequest: id => dispatch(removeRequest(id)),
        approveRequest: data => dispatch(approveRequest(data))
    };
};

const mapStateToProps = (state) => ({
    selectedRequest: state.request.selectedRequest,
    allCategories: state.request.allCategories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestsDetailsContainer));
