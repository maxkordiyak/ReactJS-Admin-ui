import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createPlace, getCategories} from '../../actions/index';
import NewPlace from '../../components/New/index';

class NewPlaceContainer extends Component {
    componentWillMount() {
        this.props.getCategories();
    }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    createPlace(data) {
        if (!data) { return false; }
        this.props.history.push('/places')
        this.props.createPlace(data)
    }

    render() {
        return (
            <NewPlace createPlace={(data) => this.createPlace(data)}
                      allCategories={this.props.allCategories}
                      goBack={(e) => this.goBack(e)} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPlace: data => dispatch(createPlace(data)),
        getCategories: () => dispatch(getCategories())
    };
};

const mapStateToProps = (state) => ({
    allCategories: state.place.allCategories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPlaceContainer));
