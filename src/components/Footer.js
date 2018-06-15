import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout } from 'antd';

class Footer extends Component {
  render() {
    return (
      <Layout style = {styles.container}>
        <Link to='/'>HOME</Link>
        <Link to='/movies'>MOVIES</Link>
        <Link to='/series'>SERIES</Link>
        <Link to='/search'>SEARCH</Link>                
      </Layout>
    );
  }
}

const styles = {
  container : {
    padding: '2rem',
    height : 200,
    backgroundColor: '#f0f2f5',
  }
}

export default Footer;

