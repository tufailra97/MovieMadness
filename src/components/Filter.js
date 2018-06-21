import React, { Component } from 'react';
import { Row, Col, Select, Button, Divider, InputNumber } from 'antd';

//official genres by movie db
const genres = [
  {
      "id": 28,
      "name": "Action"
  },
  {
      "id": 12,
      "name": "Adventure"
  },
  {
      "id": 16,
      "name": "Animation"
  },
  {
      "id": 35,
      "name": "Comedy"
  },
  {
      "id": 80,
      "name": "Crime"
  },
  {
      "id": 99,
      "name": "Documentary"
  },
  {
      "id": 18,
      "name": "Drama"
  },
  {
      "id": 10751,
      "name": "Family"
  },
  {
      "id": 14,
      "name": "Fantasy"
  },
  {
      "id": 36,
      "name": "History"
  },
  {
      "id": 27,
      "name": "Horror"
  },
  {
      "id": 10402,
      "name": "Music"
  },
  {
      "id": 9648,
      "name": "Mystery"
  },
  {
      "id": 10749,
      "name": "Romance"
  },
  {
      "id": 878,
      "name": "Science Fiction"
  },
  {
      "id": 10770,
      "name": "TV Movie"
  },
  {
      "id": 53,
      "name": "Thriller"
  },
  {
      "id": 10752,
      "name": "War"
  },
  {
      "id": 37,
      "name": "Western"
  }
];

class Filter extends Component {
  constructor () {
    super();
    this.state = {
      genre : [],
      year : '',
    }
  }



  //handle Genre
  handleGenre = (genre) => {
    this.setState({
      genre
    }, () => this.state);
  }

  //handle year
  handleYear = (year) => {
    this.setState({
      year
    }, () => this.state);
  }

  
  //handle on filter
  handleFilter = () =>{
    const { genre, year } = this.state;
    const {type} = this.props;

    let url;

    if( genre.length === 0 && year === "" ){
      return alert('No filter is selected');
    }else{
      this.setState({
        filter : true
      });
      if(type == 'movie'){
        url = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
      }else if(type == 'tv'){
        url = 'https://api.themoviedb.org/3/discover/tv?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false';
      }
      let genreList = '';
      if(genre.length > 0){
        genreList = '&with_genres='+genre.join(',');
        url += genreList;
      }
      if(year !== ''){
        if(type === 'tv'){
          url += '&first_air_date_year=' + year; 
        }else{
          url += '&primary_release_year='+year;
        }
      }
      //if filter === true pass the new url
      this.props.url(url);
    }
  }
  
  render() {
    const {filter} = this.state;
    let header;
    const displayGenres = genres.map((genre) => {
      return (
        <Select.Option key = { genre.id }>{genre.name}</Select.Option>
      );
    });

    return (
      <div style = {{margin : '2rem 0 1rem 0'}}>
        <Row type = 'flex' align = 'middle' justify = 'center' gutter = {18}>
          <Col md = {4}>
            <Select
              mode = 'tags'
              maxTagCount = {1} 
              style = {{width : '100%'}}
              allowClear
              placeholder="All Genre" 
              onChange = {this.handleGenre}
            >
              {displayGenres}
            </Select>
          </Col>
          <Col md = {3} style = {{textAlign : 'center'}}>
            <InputNumber 
              style = {{width : '100%'}}
              min = {1920} 
              max = {2022} 
              placeholder = 'All Year' 
              onChange = {this.handleYear}
            />
          </Col>
          <Col md = {3}>
            <Button className = 'filter' icon = 'filter' type = 'ghost' onClick = {this.handleFilter} style = {{borderRadius : 25, borderColor : 'rgba(0, 0, 0, 0.65)'}}>Filter</Button>
          </Col>
        </Row>
      </div>
    )
  }
};


export default Filter;