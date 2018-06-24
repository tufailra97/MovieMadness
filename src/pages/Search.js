import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions';
import Footer from '../components/Footer';
import { SEARCH, OVERVIEW_PEOPLE, OVERVIEW_SERIE, OVERVIEW_MOVIE } from '../constants';
import { Layout, Input, Card, Row, Col, Divider, Icon } from 'antd';



class Search extends Component {
  state = {
    search : false
  }
  
  
  handleSearch = (value) => {
    if(value === ''){
      return alert('Query not valid!');
    }

    this.setState({
      search : true
    });
    const url = 'https://api.themoviedb.org/3/search/multi?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1&query=' + value;
    this.props.APIRequest(url, SEARCH);
  }

  handleOverview = (id, name, type) => {
    let newName = name.replace(/\s/g,'');
    switch(type){
      case 'movie' :
          const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
          this.props.APIRequest(url, OVERVIEW_MOVIE);
          this.props.history.push(this.props.history.push('./overview/' + id + newName, [{id}]));
        break;
      case 'tv' : 
            const urlSerie = 'https://api.themoviedb.org/3/tv/'+ id +'?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
            this.props.APIRequest(urlSerie, OVERVIEW_SERIE);
            this.props.history.push(this.props.history.push('./overviewSerie/' + id + newName, [{id}]));
            break;
            case 'person' : 
            const urlPerson = 'https://api.themoviedb.org/3/person/'+ id +'?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
            this.props.APIRequest(urlPerson, OVERVIEW_PEOPLE);
            this.props.history.push(this.props.history.push('./overviewPerson/' + id + newName, [{id}]));
          break;
      default : 
        return null
    }
  }

  componentDidMount(){
    document.title = 'Movie Madness | Search';
  }

  render() {
    const {results} = this.props;
    let displayResuts;
      
    if(this.state.search === false){
      displayResuts = <h1 style = {{ fontSize : '3rem', textAlign : 'center', marginTop : '3.5rem'}}>Search to see results</h1>
    }else{
      const {search} = results;
      if(search.total_results < 1 || search.total_results === undefined){
        displayResuts = (
          <div style = {{width : '100%', textAlign : 'center', position : 'absolute', top : '30%'}}>
            <Icon style = {{fontSize : '10rem'}} type = 'warning'/>
            <p style = {{fontSize: '2rem', fontWeight : 600}}>No Result Found</p>
          </div>
        )
      }else{
        displayResuts = (
          <Row type = 'flex' style = {{flexWrap : 'wrap', justifyContent : 'center', marginTop : 20}}>
            {search.results.map((r)=> {
              let poster;
              let title;
              if(r.media_type === 'movie'){
                if(r.poster_path === null){
                  poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.title}/>
                }else{
                  poster = <img src = {'https://image.tmdb.org/t/p/w500/' + r.poster_path} alt= {r.title} />;
                }
                title = r.title;
              }else if(r.media_type === 'person'){
                if(r.profile_path === null){
                  poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.name}/>
                }else{
                  poster = <img src = {'https://image.tmdb.org/t/p/w500/' + r.profile_path} alt= {r.name} />;
                }
                title = r.name;
              }else if(r.media_type === 'tv'){
                if(r.poster_path === null){
                  poster = <img src = {require('../asset/image_not_found.jpg')} alt = {r.name}/>              
                }else{
                  poster = <img style = {{width : '100%', height : '100%'}} src = {'https://image.tmdb.org/t/p/w500/' + r.poster_path} alt= {r.name} />;
                }
                title = r.name;
              }
              return(
                <Col key = {r.id} className = 'item-wrapper' xs={10} sm={7} md={5} lg={4} style = {{overflow : 'hidden'}} >
                  <Card 
                    bodyStyle = {{padding : 15}}
                    className = 'item'
                    hoverable = {true}
                    onClick = {()=> this.handleOverview(r.id, title, r.media_type)}
                    cover = {poster}
                  >
                    <Card.Meta
                        title={title}
                      />
                  </Card>
                </Col>
              )
            })}
        </Row>);
      }
    }

    return (
      <div style = {{maxWidth : 1980, margin : '0 auto', width : '100%', height : '100%'}}>
        <Layout style = {{position : 'relative',minHeight : '96vh', paddingTop : '2rem'}}>
          <Input.Search
            placeholder="Search movie, tv-show or a person"
            onSearch={value => {this.handleSearch(value)}}
            enterButton
            style={{ width: '60%', outline : 'none', margin : '0 auto', outlineColor : 'grey'}}
          />
          {displayResuts}
        </Layout>
        
        <Divider />

        <Footer />
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
