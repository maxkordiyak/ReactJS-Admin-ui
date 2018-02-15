import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getPlace, getCategories, removePlace, updatePlace} from '../../../actions';
import PlacesDetails from '../../../components/Places/Details';

class PlacesDetailsContainer extends Component {
    componentWillMount() {
    this.props.getPlaceDetails(this.props.match.params.id);
    this.props.getCategories();
  }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

  removePlace(id) {
      if (!id) { return false; }
      this.props.history.push('/places')
      this.props.removePlace(id)
  }

  updatePlace(data) {
    if (!data) { return false; }
      this.props.history.push('/places')
      this.props.updatePlace(data)
  }

  render() {
    return (
      <PlacesDetails place={this.props.selectedPlace}
                     allCategories={this.props.allCategories}
                     removePlace={(id) => this.removePlace(id)}
                     updatePlace={(data) => this.updatePlace(data)}
                     goBack={(e) => this.goBack(e)} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaceDetails: id => dispatch(getPlace(id)),
    getCategories: () => dispatch(getCategories()),
    removePlace: id => dispatch(removePlace(id)),
      updatePlace: data => dispatch(updatePlace(data))
  };
};

const mapStateToProps = (state) => ({
  selectedPlace: state.place.selectedPlace,
  allCategories: state.place.allCategories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlacesDetailsContainer));
