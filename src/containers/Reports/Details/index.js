import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getReport, removeReport} from '../../../actions';
import ReportsDetails from '../../../components/Reports/Details';

class ReportsDetailsContainer extends Component {
  componentWillMount() {
    this.props.getReportDetails(this.props.match.params.id);
  }

  removeReport(id) {
    if (!id) { return false; }
    this.props.history.push('/reports')
    this.props.removeReport(id)
  }

  render() {
    return (
      <ReportsDetails report={this.props.selectedReport}
                      removeReport={(id) => this.removeReport(id)}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReportDetails: id => dispatch(getReport(id)),
    removeReport: id => dispatch(removeReport(id))
  };
};

const mapStateToProps = (state) => ({
  selectedReport: state.report.selectedReport
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsDetailsContainer));
