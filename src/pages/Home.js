import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionSearchMovie, actionSearchSerie, APIRequest } from '../actions'
import DisplayItemMovie from '../components/DisplayItemMovie';
import DisplayItemSerie from '../components/DisplayItemSerie'; 
import Upcoming from '../components/Upcoming';
import DrPagination from "../components/DrPagination";
import Footer from '../components/Footer';
import { Layout, Divider, Icon, Spin, Row, Carousel, Card } from 'antd';
import { NOW_UPCOMING_MOVIE, OVERVIEW_MOVIE, FETCHED_MOVIES, FETCHED_SERIES } from '../constants';


//Home component 
class Home extends Component {
  //make request before the render method is invoked
  componentWillMount(){
    
    //url
    const discoverUrlMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    const discoverUrlSeries = 'https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&page=1&sort_by=popularity.desc&language=en-US&api_key=72049b7019c79f226fad8eec6e1ee889';
    const upcomingMovie = 'https://api.themoviedb.org/3/movie/upcoming?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1';
    //requests 
    this.fetchMovie(discoverUrlMovies, FETCHED_MOVIES);
    this.fetchMovie(upcomingMovie, NOW_UPCOMING_MOVIE);
    this.fetchSerie(discoverUrlSeries, FETCHED_SERIES);
  }

  fetchMovie = ( url, type ) => {
    this.props.APIRequest(url, type);
  }

  fetchSerie = ( url, type ) =>{
    this.props.APIRequest(url, type);
  }

  //get local date
  handleDate = (date) => {
    let d = date.split('-');
    let day = d[2];
    let year = d[0];
    let month;
    //get month 
    switch(d[1]){
      case '01':
        month = 'Jan';
        break;
      case '02':
        month = 'Feb';
        break;
      case '03':
        month = 'Mar';
        break;
      case '04':
        month = 'Apr';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'Jun';
        break;
      case '07':
        month = 'Jul';
        break;
      case '08':
        month = 'Aug';
        break;
      case '09': 
        month = 'Sep';
        break;
      case '10':
        month = 'Oct';
        break;
      case '11': 
        month = 'Nov';
        break;
      default:
        month = 'Dec';
        break;
    }
    const newDate = day + ' ' + month  + ' ' + year;

    return <span style = { styles.head }>{newDate}</span>;
  }

  //handle pagination 
  handleChangePageMovie = (page) =>{
    console.log('page in home', page);
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page;

    this.fetchMovie(url, NOW_UPCOMING_MOVIE);
  }

  handleChangePageSerie = (page) => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=' + page;
    this.fetchSerie(url, FETCHED_SERIES);
  }

  overview = (id, name) =>{
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
    this.props.APIRequest(url, 'OVERVIEW_MOVIE');
    this.props.history.push('./overview/' + id + name, [{id}]);
  }

  componentDidMount(){
    document.title = 'Movie Madness | Home';
  }


  //render
  render() {
    const movies = this.props.movies.results;             //movies
    const upcoming = this.props.movies.upcoming.results;           //upcoming movie
    const series = this.props.series.results;             //series
    let displayMovies;           //display movies
    let displayUpcoming;
    let displaySeries;           //display series
    let careDiv;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;          //spinner
    console.log('this.props in home ', upcoming);
    //if movies and series is undefined, display a spinner
    if(movies.results === undefined || upcoming === undefined){
      displayMovies = <Spin indicator={antIcon} />
      careDiv = <Spin indicator={antIcon} />
      displayUpcoming = null;
    }else {
      //map through movies and series and then display the items 
      displayUpcoming = upcoming.map((movie) => {
        return <DisplayItemMovie key = {movie.id} movie = {movie} history = {this.props.history}/>
      });
      careDiv = movies.results.slice(0,10).map((movie) => {
        return(
          <div key = {movie.id} style = {{position : 'relative', overflow : 'hidden'}}>
            <img style = {{width : '100vw'}} src = {'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path} />
            <div style = {{position : 'absolute', bottom : '20%', marginLeft: 20, textTransform : 'uppercase', borderRadius : 2, }}>
              <h1 className = 'caresoul-title'>{movie.title}</h1>
              <button className = 'overview-button' onClick = {() => this.overview(movie.id, movie.title)}><span style = {{padding : '0.4rem 0.5rem', borderRight : '2px solid rgba(255,255,255, 0.8)'}}>Overview</span><span style = {{padding : '0.4rem 0.1rem'}}><Icon type='right'/></span></button>
            </div>
          </div>
        );
      });

    }
    if(series.results === undefined){
      displaySeries = <Spin indicator={antIcon} />
    }else {
      displaySeries = series.results.map((serie) => {
        return <DisplayItemSerie key = {serie.id} serie = {serie} history = {this.props.history}/>
      });
    }
    
    return (
      <div>
        <Carousel>
          {careDiv}
        </Carousel>
        <Divider />
        <Layout style = { styles.container }>
          <div style = {{maxWidth : 1980, margin: '0 auto'}}>
            <h1 className = 'title'>Related Movies</h1>
            <Row type = 'flex' style = {{justifyContent : 'center'}}>
              {displayUpcoming}
            </Row>
            <DrPagination 
              total = { this.props.movies.upcoming.total_results } 
              page = { this.handleChangePageMovie } 
              currentPage = { this.props.movies.upcoming.page }  />
          </div>
        </Layout>
        <Divider />
        <Layout style = { styles.container }>
          <div style = {{maxWidth : 1980, margin: '0 auto'}}>
            <h1 className = 'title'>Series</h1>
            <Row type = 'flex' style = { styles.row }>
              {displaySeries}
            </Row>
            <DrPagination total = { series.total_results } page = { this.handleChangePageSerie } currentPage = { this.props.series.results.page }/>
          </div>
        </Layout>

        <Divider />
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return{
    movies : state.movies,
    series : state.series
  }
}

const styles = {
  container : {
    paddingBottom : '1rem', 
  },
  row : {
    flexWrap : 'wrap',
    justifyContent: 'center',
  }
}

export default connect(mapStateToProps, { APIRequest })(Home);