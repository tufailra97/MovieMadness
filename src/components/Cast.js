import React, { Component } from 'react';
import { Popover } from 'antd';

class Cast extends Component{
  
  render() {
    const { image, character, name, comma } = this.props;
    const cast = (
      <div style = {{maxWidth : 185}}>
        <img src = {'https://image.tmdb.org/t/p/w185/' + image}  style = {{width : 185, height : 'auto'}} alt = {name}/>
        <p style = {{fontSize : 16, fontWeight : '500', marginBottom : '0',}}>{name}</p>
        <p style = {{marginBottom : 0}}>{character}</p>
      </div>
    )
    return (
      <div>
        <Popover content = {cast} placement = 'bottom' style = {{marginBottom : 0}}>
          <span style = {{marginRight : 8}}>{name + comma}</span>
        </Popover>
        
      </div>
    );
  }
}

export default Cast;