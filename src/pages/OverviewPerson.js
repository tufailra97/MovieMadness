import React, { Component } from 'react';
import {connect} from 'react-redux';
import { APIRequest } from '../actions';
import Footer from '../components/Footer';
import { Layout, Divider, Card } from 'antd';

class OverviewPerson extends Component {

  handleDate = (date) => {
    if(date === undefined){
      return 'Date not available';
    }

    let d = date.split('-');
    let day = d[2];
    let year = d[0];
    let month;
    //get month 
    switch(d[1]){
      case '01':
        month = 'Jan';
        break;
      case '02':
        month = 'Feb';
        break;
      case '03':
        month = 'Mar';
        break;
      case '04':
        month = 'Apr';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'Jun';
        break;
      case '07':
        month = 'Jul';
        break;
      case '08':
        month = 'Aug';
        break;
      case '09': 
        month = 'Sep';
        break;
      case '10':
        month = 'Oct';
        break;
      case '11': 
        month = 'Nov';
        break;
      default:
        month = 'Dec';
        break;
    }
    const newDate = day + ' ' + month  + ' ' + year;

    return newDate;
  }

  handleAlsoKnow = (e) => {
    if(e === undefined){
      return null;
    }else if(e.also_known_as === undefined && e.also_known_as === null ){
      return <p>Data not found</p>;
    }else{

      const knowAs = (
        <Card bodyStyle = {{padding : '0', background : '#F0F2F5'}} bordered = {false}>
          {
            e.map((k) => {
              return <Card.Grid style={styles.gridStyle} key = {k}>{k}</Card.Grid> 
            })
          }
        </Card>
      )
      
          
      return (
        <div styles = { styles.overview }>
          <h2 style = { styles.type }>Also know as</h2>
          <div style = {{marginTop : 10, marginBottom : 20}}>
            {knowAs}
          </div>
        </div>
      )
    }
  }

  handleDeath = (date) => {
    if(date === null){
      return null;
    }else{
      return (
        <div styles = { styles.overview }>
          <h2 style = { styles.type }>Death</h2>
          <p>{this.handleDate(date)}</p>
        </div>
      )
    }
  }
  
    
  handleHomepage = (homepage) => {
    if(homepage === null || homepage === undefined){
      return <p>Website not available</p>
    }else{
      return <a style = {{color : '#2E2F30'}} href = {homepage}>{homepage}</a>
    }
  }
  
  
  render() {
    const person = this.props.people.results;
    const alsoKnown = this.handleAlsoKnow(person.also_known_as);
    const homePage = this.handleHomepage(person.homepage);
    const death = this.handleDeath(person.deathday);
    return (
      <div style = {{maxWidth : 2160, margin : '0 auto', width : '100%'}}>
        <div className = 'overview'>
          <Layout className = 'overview-media'>
            <div>
              <img className = 'overview-image' src = { person.profile_path === null || person.profile_path === undefined ? require('../asset/image_not_found.jpg') : 'https://image.tmdb.org/t/p/w500/' + person.profile_path} alt = {'overview.title'}/>
            </div> 
          </Layout>
          <Layout className = 'overview-description'>
              <h1 style = { styles.title }>{person.name}</h1>
              <Divider />
              <div style = { styles.overview }>
                <h2 style = { styles.type }>Date of Birth</h2>
                <p>{this.handleDate(person.birthday)}</p>
              </div>
              {death}
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Place of Birth</h2>
                <p>{person.place_of_birth === undefined ? 'Place not found' : person.place_of_birth}</p>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Biography</h2>
                <p style = {styles.resP }>{person.biography === undefined ? 'Biography not found' : person.biography}</p>
              </div>
              {alsoKnown}

              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Official Website</h2>
                {homePage}
              </div>
          </Layout>
        </div>
        <Divider />        
        <Footer />
      </div>
    )
  }
};

const styles = {
  container : {
    width : '100%',
    Heigth : '100%',
    padding : '1rem',
  },
  title : {
    marginBottom: 0,
    fontSize: '3rem',
  },
  head : {
    marginRight: '2rem',
    padding : '0.3rem 0.8rem',
    borderRadius : '25px',
    backgroundColor : 'rgba(27, 38, 49, 0.56)',
    color : 'white'
  },
  type : {
    marginRight : '0.5rem',
    marginBottom : '0.1rem',
    color: '#242425',
    fontSize : '1rem',
    fontWeight : '600',
    textTransform : 'uppercase'
  },
  resP : {
    marginBottom : 10,
    fontSize : 14, 
    lineHeight : '1.6rem', 
    width  : '90%'
  },
  modalBodyStyle : {
    width : '100%',
    height : '90vh',
    backgroundColor : 'rgba(240, 242, 245, 0.99)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent : 'center',
    borderRadius : 5,
  },
  overview : {
    marginBottom : 10
  },
  gridStyle : {
    width: '25%',
    textAlign: 'center',
    padding : 5,
    background : '#F0F2F5'
  }  
};

const mapStateToProps = (state) => {
  return {
    people : state.people
  }
}

export default connect(mapStateToProps, {APIRequest})(OverviewPerson);