import React, { Component } from 'react';
import { Card } from 'antd';


export default class Suggestion extends Component {

  render() {
    const {poster, title} = this.props
    return (
      <Card 
        cover = {<img style = {{height : '100%', overflow: 'hidden'}} src = {'https://image.tmdb.org/t/p/w300/' + poster} alt = {title}/>}
        hoverable = {true}>
        <Card.Meta 
          title = {title}
        />
      </Card>
    )
  }
};
