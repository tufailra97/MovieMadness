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
    console.log(genre);
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
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1';
    if( genre.length === 0 && year === "" ){
      alert('No filter is selected');
    }else{
      this.setState({
        filter : true
      });
      let genreList = '';
      if(genre.length > 0){
        genreList = '&with_genres='+genre.join();
        url += genreList;  
      }
      if(year !== ""){
        url += '&primary_release_year='+year;
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
      <div style = {{margin : '1rem 0'}}>
        <Row type = 'flex' align = 'middle' justify = 'center' gutter = {18}>
          <Col span = {4}>
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
          <Col span = {3} style = {{textAlign : 'center'}}>
            <InputNumber 
              style = {{width : '100%'}}
              min = {1920} 
              max = {2030} 
              placeholder = 'All Year' 
              onChange = {this.handleYear}
            />
          </Col>
          <Col span = {3}>
            <Button className = 'filter' icon = 'filter' type = 'ghost' onClick = {this.handleFilter} style = {{borderRadius : 25, borderColor : 'rgba(0, 0, 0, 0.65)'}}>Filter</Button>
          </Col>
        </Row>
      </div>
    )
  }
};


export default Filter;