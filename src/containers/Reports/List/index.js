import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getReportsList, setReportsPageIndex, setReportsPageLimit, setReportsFilterStr, sortReportsColumn, getReport } from '../../../actions';
import ReportsList from '../../../components/Reports/List';

class ReportsListContainer extends Component {
    componentDidMount() {
        this.props.getReportsList()
    }

  goToReportById(id) {
    if (!id) { return false; }
    this.props.history.push(`/reports/${id}`);
  }

  render() {
    return (
      <ReportsList reports={this.props.list}
      pagination={this.props.pagination}
      isLoading={this.props.isLoading}
      getReportsList={this.props.getReportsList}
      setReportsPageIndex={this.props.setReportsPageIndex}
      setReportsPageLimit={this.props.setReportsPageLimit}
      setReportsFilterStr={this.props.setReportsFilterStr}
      sortReportsColumn={this.props.sortReportsColumn}
      goToReport={(id) => this.goToReportById(id)}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReportsList: () => dispatch(getReportsList()),
    setReportsPageIndex: index => { console.log(index); dispatch(setReportsPageIndex(index)) },
    setReportsPageLimit: limit => dispatch(setReportsPageLimit(limit)),
    setReportsFilterStr: value => dispatch(setReportsFilterStr(value)),
    sortReportsColumn: column => dispatch(sortReportsColumn(column))
  };
};

const mapStateToProps = (state) => ({
  list: state.report.list,
  isLoading: state.report.isLoading,
  pagination: state.report.pagination
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsListContainer));
