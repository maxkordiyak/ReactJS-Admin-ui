import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import _ from 'lodash';
import { MDCTextField, MDCTextFieldFoundation } from '@material/textfield/dist/mdc.textfield'; // textfield for custom input mask
import { Title, Checkbox, FormField, Button, Textfield, Card, Grid, Cell, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';
import Thumbnail from 'react-fine-uploader/thumbnail'
import Dropzone from 'react-fine-uploader/dropzone'

import 'react-fine-uploader/gallery/gallery.css'
import 'react-select/dist/react-select.css';
import './index.css';

class ReportsDetails extends Component {
  render() {
    return(
      <div className="reports-details">
        <h2 className="mdc-typography--title page-title">Повідомлення</h2>
        <Toolbar className="places-details-toolbar">
          <ToolbarRow>
            <ToolbarSection align="start">
              <div className="back-button">
                <Link to="/reports" className="back-button__link">
                  <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style={{enableBackground:'new 0 0 24 24'}} xmlSpace="preserve" alt="Arrow Left Icon" className="custom-icon">
                    <polygon points="18.4,10.1 16.9,8.6 12,13.6 7.1,8.6 5.6,10.1 12,16.4 "/>
                  </svg>
                  Назад
                </Link>
              </div>
            </ToolbarSection>
            <ToolbarSection align="end">
              <Link to={`/places/${this.props.report.placeId}`}>
                <Button className="goto-button" dense>Перейти до пункту збору</Button>
              </Link>
                <Button onClick={() => this.props.removeReport(this.props.report._id)}
                        className="details-button" raised>Видалити</Button>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
          <Grid className="centered-grid-sm">
            <Cell col={6}>
              <p className="mdc-typography">
                Ім&#39;я
              </p>
            </Cell>
            <Cell col={6}>
              <p className="mdc-typography">
              {this.props.report.name}
              </p>
            </Cell>
            <Cell col={6}>
            <p className="mdc-typography">
              E-mail
            </p>
            </Cell>
            <Cell col={6}>
            <p className="mdc-typography">
              {this.props.report.email}
            </p>
            </Cell>
            <Cell col={6}>
            <p className="mdc-typography">
              Причина
            </p>
            </Cell>
            <Cell col={6}>
            <p className="mdc-typography">
              {this.props.report.reason}
            </p>
            </Cell>
            <Cell col={6}>
            <p className="mdc-typography">
              Повідомлення
            </p>
            </Cell>
            <Cell col={6}>
              <p className="mdc-typography">
                {this.props.report.message}
              </p>
            </Cell>
          </Grid>
      </div>
    )
  }
}
export default ReportsDetails;
