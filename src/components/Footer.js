import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout, Icon } from 'antd';

class Footer extends Component {
  render() {
    return (
      <Layout style = {styles.container}>
        <div className = 'footer-container'>

          <div className = 'links'>
            <div className = 'link'>
              <Link to='/'>
                <Icon style = {styles.icon} type = 'home'/>
                <span>HOME</span>
              </Link>
            </div>
            <div className = 'link'>
              <Link to='/movies'>
                <Icon style = {styles.icon} type = 'video-camera'/>
                MOVIES
              </Link>
            </div>
            <div className = 'link'>
              <Link to='/series'>
                <Icon style = {styles.icon} type = 'desktop' />
                SERIES
              </Link>
            </div>
            <div className = 'link'>
              <Link to='/search'>
                <Icon style = {styles.icon} type = 'search'/>
                SEARCH
              </Link>                
            </div>
          </div>

          <div className = 'info'>
            <p>This website uses data provided by <span style = {{fontWeight : 600}}>TMDb</span></p>
            <p>&copy; 2018 <span style = {{fontWeight : 600}}> <Link style = {{color : '#000'}} to = '/'>MovieMadness.</Link></span></p>
          </div>

        </div>
      </Layout>
    );
  }
}

const styles = {
  container : {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
  },
  icon : {
    marginRight: 15,
    fontSize: 20,
  }
}

export default Footer;

