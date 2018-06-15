import React, { Component } from 'react';
import { Layout, Button } from 'antd';

export default class ErrorPage extends Component {
  constructor(){
    super();
    
  }

  render() {
    console.log(this.props);
    return (
      <Layout 
        style = { styles.container }>
        <h1 style = { styles.errorHeader }>404</h1>
        <p style = { styles.erroreMessage }>The page you are looking for is not available.</p>
        <Button type = 'ghost' size = 'large' onClick = {()=> {this.props.history.push('/')}}>
          Go to Homepage
        </Button>
      </Layout>
    )
  }
};


const styles = {
  container : { 
    display : 'flex', 
    flexDirection : 'column',
    width: '100%',
    height : '100vh',
    justifyContent : 'center',
    alignContent : 'center',
    alignItems : 'center'
  },
  errorHeader : {
    fontSize: '5rem',
  },
  erroreMessage : {
    fontSize : '2.5rem',
    textAlign : 'center'
  }
}
