import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions';
import { Card, Col } from 'antd';

class DisplayItemMovie extends Component {

  overview = (id, name) =>{
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
    this.props.APIRequest(url, 'OVERVIEW_MOVIE');
    this.props.history.push('/overview/' + name, [{id}]);
  }

  render() {
    const {movie} = this.props;
    return (
      <Col className = 'item-wrapper' xs={10} sm={7} md={5} lg={4} onClick = {()=> this.overview(movie.id, movie.title) } style = {{overflow : 'hidden'}} >
        <Card 
          className = 'item'
          bodyStyle = {{ padding : 0,}}
          hoverable = {true}
          title = {movie.title}
          key = {movie.id} 
          type = 'inner'
          cover = {<img style = {{height : '100%', overflow: 'hidden'}} src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt = {movie.title} />}
        />
      </Col>
    )
  }
};


export default connect(null, { APIRequest })(DisplayItemMovie);