import React, { Component } from 'react';
import {connect} from 'react-redux';
import { APIRequest } from '../actions';

class People extends Component {
  render() {
    return (
      <div>
        <h1>Name</h1>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    people : state
  }
}

export default connect(null, APIRequest)(People);