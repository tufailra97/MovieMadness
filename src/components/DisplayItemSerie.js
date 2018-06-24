import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions'
import { Card, Col, } from 'antd';

class DisplayItemSerie extends Component {

  overview = (id, name) =>{
    let newName = name.replace(/\s/g,'');
    const url = 'https://api.themoviedb.org/3/tv/'+id+'?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
    this.props.APIRequest(url, 'OVERVIEW_SERIE');
    this.props.history.push('/overviewSerie/' + newName, [{id}]);
  }

  render() {
    const {serie} = this.props;
    return (
      <Col className = 'item-wrapper' xs={10} sm={7} md={5} lg={4} onClick = {()=> {this.overview(serie.id, serie.name)} }>
        <Card 
          className = 'item'
          bodyStyle = {{ padding : 0}}
          hoverable = {true}
          title = {serie.name}
          key = {serie.id} 
          type = 'inner'
          cover = {<img style = {{height : '100%'}} src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} alt = {serie.title} />}
        />
      </Col>
    )
  }
};


export default connect(null, { APIRequest })(DisplayItemSerie);