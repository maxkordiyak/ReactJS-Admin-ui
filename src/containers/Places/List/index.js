import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlacesList, setPageIndex, setPageLimit, setFilterStr, sortColumn, getPlace } from '../../../actions';
import PlacesList from '../../../components/Places/List';

class PlacesListContainer extends Component {
    componentWillMount() {
        this.props.getPlacesList()
    }

    goToPlaceById(id) {
    if (!id) { return false; }
    this.props.history.push(`/places/${id}`);
  }

  render() {
    return (
      <PlacesList places={this.props.list}
      pagination={this.props.pagination}
      isLoading={this.props.isLoading}
      getPlacesList={this.props.getPlacesList}
      setPageIndex={this.props.setPageIndex}
      setPageLimit={this.props.setPageLimit}
      setFilterStr={this.props.setFilterStr}
      sortColumn={this.props.sortColumn}
      goToPlace={(id) => this.goToPlaceById(id)}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlacesList: () => dispatch(getPlacesList()),
    setPageIndex: index => { console.log(index); dispatch(setPageIndex(index)) },
    setPageLimit: limit => dispatch(setPageLimit(limit)),
    setFilterStr: value => dispatch(setFilterStr(value)),
    sortColumn: column => dispatch(sortColumn(column))
  };
};

const mapStateToProps = (state) => ({
  list: state.place.list,
  isLoading: state.place.isLoading,
  pagination: state.place.pagination
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlacesListContainer));
