import React, { Component } from 'react';
import {connect} from 'react-redux';
import { APIRequest } from '../actions';
import Footer from '../components/Footer';
import { Layout, Divider } from 'antd';

class OverviewPerson extends Component {
  render() {
    const people = this.props.results;
    console.log('people in person', people);
    return (
      <div style = {{maxWidth : 2160, margin : '0 auto', width : '100%'}}>
        <div className = 'overview'>
          <Layout className = 'overview-media'>
            <div>
              <img className = 'overview-image' src = {  require('../asset/image_not_found.jpg') } alt = {'overview.title'}/>
            </div> 
          </Layout>
          <Layout className = 'overview-description'>
            <h1>{}</h1>
          </Layout>
        </div>
        <Divider />        
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    people : state.people
  }
}

export default connect(mapStateToProps, {APIRequest})(OverviewPerson);