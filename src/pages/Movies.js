import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions'
import DisplayItemMovie from '../components/DisplayItemMovie';
import DrPagination from '../components/DrPagination';
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import { Layout, Divider, Icon, Spin, Row } from 'antd';


//Home component 
class Movies extends Component {
  constructor(){
    super();
    document.title = 'Mr Movie | Movies'
  }
  
  //make request before the render method is invoked
  componentWillMount(){
    //url
    const discoverUrlMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    //requests 
    this.fetchMovie(discoverUrlMovies);
  }

  fetchMovie = (url) => {
    this.props.APIRequest(url, 'FETCHED_MOVIES');
  }

  //handle the new filter url
  handleFilter = (url) =>{
    this.fetchMovie(url);
  }


  //handle Page
  handleChangePageMovie = (page) =>{
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page;  
    this.fetchMovie(url);
  }

  //render
  render() {
    const movies = this.props.movies.results;             //movies
    let displayMovies;           //display movies
    const antIcon = <Icon type="loading" style={{ margin : 100,fontSize: 24 }} spin />;          //spinner

    //if movies and series is undefined, display a spinner
    if(movies.results === undefined){
      displayMovies = <Spin indicator={antIcon} />
    }else {
      //map through movies and series and then display the items 
      displayMovies = movies.results.map((movie) => {
        return <DisplayItemMovie key = {movie.id} movie = {movie} history = {this.props.history}/>
      });
    }

    return (
      <div>
        <div className='header'>
          Movies
        </div>
        <Divider />
        <Layout style = {{display : 'flex', flexDirection : 'column', alignContent : 'flex-start', paddingBottom : '2rem'}}>
          <Filter url = {this.handleFilter} />
          <Row type = 'flex' style = { styles.row }>
            {displayMovies}
          </Row>
          <DrPagination 
            total = { movies.total_results } 
            page = { this.handleChangePageMovie } 
            currentPage = { this.props.movies.results.page } 
          />
        </Layout>
        <Divider/>
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return{
    movies : state.movies,
  }
}

const styles = {
  container : {
    paddingBottom : '1rem'
  },
  row : {
    width : '100%',
    flexWrap : 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  }
}

export default connect(mapStateToProps, { APIRequest })(Movies);