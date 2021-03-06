import config from './config.js';
import React, { Component } from 'react';

import Select from './components/Select.js';
import RentSelect from './components/RentSelect.js';

import moment from 'moment';
import DatePicker from 'react-datepicker';

export default class App extends Component {
  constructor () {
    super();

    this.prepareParam = this.prepareParam.bind(this);
    this.changeFormActionUrl = this.changeFormActionUrl.bind(this);
    this.sendQuery = this.sendQuery.bind(this);

    this.state = {
      formActionUrl: config.formActionUrls.rentShort,
      paramGetPrefix: config.paramGetPrefixRent,
      rentOptionsDisabled: false,
      longRent: false,
      sale: false
    };
  }

  sendQuery () {
    window.location.href = config.host + config.sendQueryPath;
  }

  prepareParam (name) {
    return this.state.paramGetPrefix + '[' + name +']';
  }

  changeFormActionUrl (selectValue) {
    let newUrl = config.searchPathExternal;
    let newPrefix = config.paramGetPrefixRent;
    let rentOptionsDisabled = false;
    let longRent = false;
    let sale = false;

    switch (selectValue) {
      case 'short_rent':
        newUrl = config.formActionUrls.rentShort;
        newPrefix = config.paramGetPrefixRent;
        break;
      case 'long_rent':
        newUrl = config.formActionUrls.rentLong;
        newPrefix = config.paramGetPrefixRent;
        rentOptionsDisabled = true;
        longRent = true;
        break;
      case 'sale':
        newUrl = config.formActionUrls.sale;
        newPrefix = config.paramGetPrefixSale;
        rentOptionsDisabled = true;
        longRent = true;
        sale = true;
        break;
    };

    this.setState({
      formActionUrl: newUrl,
      paramGetPrefix: newPrefix,
      rentOptionsDisabled: rentOptionsDisabled,
      longRent: longRent,
      sale: sale
    });
  }

  render() {

    let realtyTypes = config.getParams.realtyType.values;

    if (this.state.longRent) {
      realtyTypes = realtyTypes.concat(config.getParams.realtyType.valuesLong);
    }

    if (this.state.sale) {
      realtyTypes = realtyTypes.concat(config.getParams.realtyType.valuesSale);
    }

    return (
      <div className='kipr-widget'>
        <form
            className='kipr-widget__form'
            method='get'
            action={config.host + this.state.formActionUrl} >

          <h6 className='kipr-widget__header'>Поиск</h6>

          <div className='kipr-widget__row kipr-widget__row--type-flex'>
            <div className='kipr-widget__column'>
              <RentSelect
                name={this.prepareParam(config.getParams.duration.name)}
                sale={this.state.sale}
                title={config.getParams.duration.title}
                options={config.getParams.duration.values}
                onChange={this.changeFormActionUrl}
                />
            </div>
            <div className='kipr-widget__column'>
              <Select
                name={this.prepareParam(config.getParams.realtyType.name)}
                title={config.getParams.realtyType.title}
                options={realtyTypes}
                />
            </div>
          </div>

          <div className='kipr-widget__row'>
            <Select
              name={this.prepareParam(config.getParams.region.name)}
              title={config.getParams.region.title}
              options={config.getParams.region.values}
              />
          </div>


          <div className='kipr-widget__row kipr-widget__row--type-flex'>
            <div className='kipr-widget__column'>
              <Select
                name={this.prepareParam(config.getParams.bedrooms.name)}
                title={config.getParams.bedrooms.title}
                options={config.getParams.bedrooms.values}
                />
            </div>
            <div className='kipr-widget__column'>
              <Select
                disabled={this.state.rentOptionsDisabled}
                name={this.prepareParam(config.getParams.beds.name)}
                title={config.getParams.beds.title}
                options={config.getParams.beds.values}
                />
            </div>
          </div>

          <div className='kipr-widget__row kipr-widget__row--type-flex'>
            <div className='kipr-widget__column'>
              <div className='kipr-widget__formControl kipr-widget__formControl--type-date'>
                <label className='kipr-widget__label'>{config.getParams.checkInDate.title}:</label>
                <DatePicker
                  disabled={this.state.rentOptionsDisabled}
                  className='kipr-widget__input'
                  dateFormat="DD.MM.YYYY"
                  minDate={moment()}
                  placeholder={moment()}
                  name={this.prepareParam(config.getParams.checkInDate.name)}
                  placeholderText='ДД.ММ.ГГГГ'
                  locale="ru"
                   />
              </div>
            </div>
            <div className='kipr-widget__column'>
              <Select
                disabled={this.state.rentOptionsDisabled}
                name={this.prepareParam(config.getParams.daysCount.name)}
                title={config.getParams.daysCount.title}
                options={config.getParams.daysCount.values}
                />
            </div>
          </div>

          <div className='kipr-widget__formActions'>
            <a className='kipr-widget__extendSearchLink' onClick={this.sendQuery}>Послать запрос</a>

            <button className='kipr-widget__button' type='submit'>Найти</button>
          </div>
        </form>
      </div>
    );
  }
}
