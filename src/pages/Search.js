import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions';
import { Layout, Input, Button, Card, Row, Col } from 'antd';
import { SEARCH } from '../constants';



class Search extends Component {
  state = {
    search : true
  }
  
  
  handleSearch = (value) => {
    if(value === ''){
      alert('Query not valid!');
    }
    const url = 'https://api.themoviedb.org/3/search/multi?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1&query=' + value;
    this.props.APIRequest(url, SEARCH);
  }

  handleOverview = (id, name, type) => {
    switch(type){
      case 'movie' :
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
        this.props.APIRequest(url, 'OVERVIEW_MOVIE');
        this.props.history.push(this.props.history.push('./overview/' + id + name, [{id}]));
      default : 
        return null
    }
  }

  componentDidMount(){
    document.title = 'Mr Movie | Search';
  }

  render() {
    const {results} = this.props;
    let displayResuts;
    
    console.log('results ',results);
    
    if(results.begin === false){
      displayResuts = <h1>Search to see results</h1>
    }else{
      console.log('true');
      const {search} = results;
      console.log(search);
      if(search.total_results < 1 || search.total_results === undefined){
        displayResuts = <h1>No results was found</h1>
      }else{
        displayResuts = search.results.map((r)=> {
          let poster;
          let button;
          let title;
          if(r.media_type === 'movie'){
            if(r.poster_path === null){
              poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.title}/>
            }else{
              poster = <img className = 'poster' src = {'https://image.tmdb.org/t/p/w500/' + r.poster_path} alt= {r.title} />;
            }
            title = r.title;
          }else if(r.media_type === 'person'){
            if(r.profile_path === null){
              poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.name}/>
            }else{
              poster = <img src = {'https://image.tmdb.org/t/p/w500/' + r.profile_path} alt= {r.name} />;
            }
            title = r.name;
            button = <button>View details person</button>;
          }else if(r.media_type === 'tv'){
            if(r.poster_path === null){
              poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.name}/>              
            }else{
              poster = <img src = {'https://image.tmdb.org/t/p/w500/' + r.poster_path} alt= {r.name} />;
            }
            title = r.name;
            button = <button>View details serie</button>;
          }
          return(
            <Col className = 'item-wrapper' xs={10} sm={7} md={5} lg={4} style = {{overflow : 'hidden'}} >
              <Card 
                bodyStyle = {{padding : 15}}
                className = 'item'
                hoverable = {true}
                onClick = {()=> this.handleOverview(r.id, r.name, r.media_type)}
                cover = {poster}
              >
                <Card.Meta
                    title={title}
                  />
              </Card>
            </Col>
          )
        });
      }
    }

    return (
      <div style = {{maxWidth : 1980, margin : '0 auto', width : '100%', height : '100%'}}>
        <Layout style = {{minHeight : '96vh',display : 'flex', flexDirection: 'column', justifyContent : 'flex-start', alignItems : 'center'}}>
          <Input.Search
            placeholder="Search"
            onSearch={value => {this.handleSearch(value)}}
            enterButton
            style={{ width: '60%', outline : 'none', marginTop : 25, marginBottom : 25}}
          />
          <Row type = 'flex' style = {{flexWrap : 'wrap', justifyContent : 'center'}}>
            {displayResuts}
          </Row>
        </Layout>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    results : state.search
  }
}

export default connect(mapStateToProps, {APIRequest})(Search);
