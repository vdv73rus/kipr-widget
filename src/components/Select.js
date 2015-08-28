import config from '../config.js';
import React, { Component } from 'react';

export default class Select extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <select name={this.props.name}>
        <option value=''>{this.props.title}</option>

        {this.props.options.map(function(option) {
          return <option value={option.name}>{option.title}</option>;
        })}

      </select>
    );
  }
}
