import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import _ from 'lodash';
import { MDCTextField, MDCTextFieldFoundation } from '@material/textfield/dist/mdc.textfield';
import { Title, Checkbox, FormField, Button, Textfield, Card, Grid, Cell, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Thumbnail from 'react-fine-uploader/thumbnail';
import 'react-fine-uploader/gallery/gallery.css';

import 'react-select/dist/react-select.css';
import './index.css';

const uploader = new FineUploaderTraditional({
   options: {
      deleteFile: {
         enabled: true,
         endpoint: 'https://dev.recyclemap.org/api/images'
      },
      request: {
          inputName: 'img',
          endpoint: 'https://dev.recyclemap.org/api/images/upload'
      },
      autoUpload: true
   }
});

const fileInputChildren = <span>+</span>;

class PlacesDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      allCategories: this.props.allCategories,
      selectedCategories: [],
      categories: [],
      workingHours: "",
      phone: "",
      photos: [],
      submittedFiles: [],
      description: "",
      isHidden: "",
      isContainer: "",
      latitude:"",
      longitude: ""
    };
    this.getCategories = this.getCategories.bind(this);
    this.goToCategory = this.goToCategory.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChangeAddress = (address) => this.setState({ address });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.place, nextProps.place)) {
      const place = nextProps.place;
      const photos = Array.isArray(place.photos) ?
          place.photos.map(photo => ({ id: parseInt(_.uniqueId()),
              name: photo,
              thumbnailUrl: `https://dev.recyclemap.org/image_uploads/thumbs/178x120/${photo}`,
              uuid: photo })) : [];
      this.setState({
      id: place._id,
        name: place.name,
        address: place.address,
        allCategories: this.props.allCategories,
        selectedCategories: [],
        categories: Array.isArray(place.categories) ?
          place.categories.map(category => ({ active: true, name: category, type: category, _id: parseInt(_.uniqueId()) } )) : [],
        workingHours: place.workingHours,
        phone: place.phone,
        photos: photos,
        description: place.description,
        isHidden: place.hidden,
        isContainer:  place.isContainer,
        submittedFiles: [],
        latitude:"",
        longitude: ""
      });
      if (photos.length) {
          uploader.methods.addInitialFiles(photos);
      }
    } else {
        const place = this.props.place;
        const photos = Array.isArray(place.photos) ?
            place.photos.map(photo => ({ id: parseInt(_.uniqueId()),
                name: photo,
                thumbnailUrl: `https://dev.recyclemap.org/image_uploads/thumbs/178x120/${photo}`,
                uuid: photo })) : [];
        this.setState({
            id: place._id,
            name: place.name,
            address: place.address,
            allCategories: this.props.allCategories,
            selectedCategories: [],
            categories: Array.isArray(place.categories) ?
                place.categories.map(category => category) : [],
            workingHours: place.workingHours,
            phone: place.phone,
            photos: photos,
            description: place.description,
            isHidden: place.hidden,
            isContainer:  place.isContainer,
            submittedFiles: [],
            latitude:"",
            longitude: ""
        });
        if (photos.length) {
            uploader.methods.addInitialFiles(photos);
        }
    }
  }

  componentDidMount() {
      uploader.on('statusChange', (id, oldStatus, newStatus) => {
          if (newStatus === 'submitted') {
              this.setState({ photos: this.state.photos })
          }
          else if (isFileGone(newStatus)) {
              const submittedFiles = this.state.photos;
              const indexToRemove = submittedFiles.indexOf(id);
              submittedFiles.splice(indexToRemove, 1);
              this.setState({ photos: this.state.photos });
          }
      });

      uploader.on('onComplete', (id, name, response) => {
          this.setState(prevState => ({
              submittedFiles: [...prevState.submittedFiles, response.image]
          }))
      })
  }

  getCategories(input, callback) {
    input = input.toLowerCase();
    const allCategories = this.state.allCategories;
    let options = this.state.allCategories.filter(i => {
      return i._id.substr(0, input.length) === input;
    });
    const data = {
      options: options,
      complete: options.length
    };
    callback(null, data);
  }

  onChange(selectedCategories) {
    this.setState({
      selectedCategories: selectedCategories,
      categories: selectedCategories
    })
  }

  goToCategory(value, event) {
    console.log(this.state)
  }

    onClick(e) {
        e.preventDefault();
        let name,
        categories,
        address,
        workingHours,
        phone,
        description,
        isHidden,
        isContainer,
        latitude,
        longitude,
        submittedFiles;

        const photos = Array.isArray(this.state.photos) ?
            this.state.photos.map(photo => photo.name) : [];

        geocodeByAddress(this.state.address,  (err, { lat, lng }) => {
            if (err) {
                console.log(err);
            }

            this.setState({
                latitude: lat, longitude: lng
            }, () => {
                this.props.updatePlace({
                    id: this.state.id,
                    name: this.state.name,
                    address: this.state.address,
                    categories: Array.isArray(this.state.categories) ?
                        this.state.categories.map(category => category.type ) : [],
                    workingHours: this.state.workingHours,
                    phone: this.state.phone,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    description: this.state.description,
                    isHidden: this.state.isHidden,
                    isContainer: this.state.isContainer,
                    photos: photos.concat(this.state.submittedFiles)
                })
            });
        });
    };

  render() {
      const inputProps = {
          value: this.state.address,
          onChange: this.onChangeAddress
      };

      return(
      <div className="places-details">
        <h2 className="mdc-typography--title page-title">Точка збору</h2>
        <Toolbar className="places-details-toolbar">
          <ToolbarRow>
            <ToolbarSection align="start">
              <div className="back-button">
                <Link to="/places" className="back-button__link">
                  <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style={{enableBackground:'new 0 0 24 24'}} xmlSpace="preserve" alt="Arrow Left Icon" className="custom-icon">
                    <polygon points="18.4,10.1 16.9,8.6 12,13.6 7.1,8.6 5.6,10.1 12,16.4 "/>
                  </svg>
                  Назад
                </Link>
              </div>
            </ToolbarSection>
            <ToolbarSection align="end">
                <Button onClick={() => this.props.removePlace(this.props.place._id)}
                        className="details-button" raised>Видалити</Button>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <Card className="places-card">
        <div className="details-actions">
        </div>
        <div className="details-inner">
            <Grid>
            <Cell col={6}><Title>Назва пункту</Title></Cell>
            <Cell col={6}>
              <Textfield className="details-textfield"
              floatingLabel="Назва пункту"
              name="name"
              value={this.state.name}
              onChange={({target : {value : name}}) => {
                this.setState({ name })
              }}
              />
            </Cell>

              <Cell col={6}><Title>Адреса</Title></Cell>
                <Cell col={6}>
                    <div className="mdc-text-field  details-textfield">
                        <PlacesAutocomplete
                            className="mdc-text-field__input"
                            inputProps={inputProps} />
                        <div className="mdc-text-field__bottom-line"></div>
                    </div>
                </Cell>

              <Cell col={6}><Title>Години роботи</Title></Cell>
              <Cell col={6}>
                <Textfield className="details-textfield"
                floatingLabel="Години роботи"
                name="workingHours"
                value={this.state.workingHours}
                onChange={({target : {value : workingHours}}) => {
                  this.setState({ workingHours })
                }}
                />
              </Cell>

              <Cell col={6}><Title>Телефон (необовязково)</Title></Cell>
              <Cell col={6}>
              <div className="mdc-text-field  details-textfield">
              <InputMask
              className="mdc-text-field__input"
              mask="+38 (999) 999-99-99"
              name="phone"
              value={this.state.phone}
              onChange={({target : {value : phone }}) => {
                this.setState({ phone })
              }}
               />
               <div className="mdc-text-field__bottom-line"></div>
              </div>
              </Cell>

            <Cell col={6}><Title>Матеріали</Title></Cell>
              <Cell col={6}>
                <Select.Async
                closeOnSelect={false}
                multi={true}
                value={this.state.categories}
                onChange={this.onChange}
                onValueClick={this.goToCategory}
                valueKey="type"
                labelKey="name"
                loadOptions={this.getCategories} />
              </Cell>

              <Cell col={6}><Title>Опис</Title></Cell>
              <Cell col={6}>
                <Textfield className="details-textfield"
                  floatingLabel="Опис"
                  textarea
                  rows="8"
                  cols="40"
                  value={this.state.description}
                  onChange={({target : {value : description}}) => {
                    this.setState({ description })
                  }}
                />
              </Cell>

              <Cell col={6}><Title>Фото (необовязково)</Title></Cell>
              <Cell col={6}>
              <div>
                <Gallery fileInput-children={ fileInputChildren } uploader={ uploader } />
              </div>
              </Cell>

              <Cell col={4}></Cell>
              <Cell col={2}>
                <FormField id="labeled-checkbox">
                  <Checkbox
                    onChange={({target: {isHidden}})=>{
                      this.setState({ isHidden: !this.state.isHidden })
                    }}
                    checked={this.state.isHidden}
                  />
                  <label>Приховати</label>
                </FormField>
              </Cell>
              <Cell col={2}>
                <FormField id="labeled-checkbox">
                  <Checkbox
                    onChange={({target: {isContainer}})=>{
                      this.setState({ isContainer: !this.state.isContainer })
                    }}
                    checked={this.state.isContainer}
                  />
                  <label>Контейнер</label>
                </FormField>
              </Cell>
              <Cell col={4}></Cell>
            </Grid>

        </div>
        </Card>

          <div className="details-footer">
            <Button className="details-button" raised onClick={this.onClick}>Зберегти</Button>
          </div>

      </div>
    )
  }
}

const isFileGone = status => {
    return [
        'canceled',
        'deleted',
    ].indexOf(status) >= 0
}
export default PlacesDetails;
