import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions';
import { List, Button, Col, Card } from 'antd';

class Upcoming extends Component {

  overview = (id, name) =>{
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
      this.props.APIRequest(url, 'OVERVIEW_MOVIE');
      this.props.history.push('./overview/' + id + name, [{id}]);
  }

  render() {
    const {name, image, id, overview, vote} = this.props;
    return (
      <Col className = 'item-wrapper' xs={8} sm={5} md={4} lg={4} onClick = {()=> this.overview(id, name) } style = {{overflow : 'hidden'}} >
        <Card 
          className = 'item'
          bodyStyle = {{ padding : 0}}
          hoverable = {true}
          title = {name}
          key = {id} 
          cover = {<img className='poster' style = {{height : '100%', overflow: 'hidden'}} src={'https://image.tmdb.org/t/p/w500/' + image} alt = {name} />}
        />
      </Col>
    )
  }
};


export default connect(null, { APIRequest })(Upcoming);