import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cast from '../components/Cast';
import Suggestions from '../components/Suggestions';
import Footer from '../components/Footer';
import { APIRequest } from '../actions';
import CurrencyFormat from 'react-currency-format';
import { MOVIE_SUGGESTION, FETCH_TRAILER, MOVIE_CREDITS, CAST_MOVIE } from '../constants';
import { Card, Layout, Divider, Button, Icon, Modal, Spin, Tooltip, Row, Col, Popover } from 'antd';

class OverviewMovie extends Component {  
  constructor(){
    super(); 

    document.title = 'Movie Madness | Overview ';
    this.state = { 
      visible: false,
    }
  }

  //display modal 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  //cancel modal
  handleCancel = () =>{
    this.setState({
      visible : false
    })
  }

  //get local date
  handleDate = (date) => {
    if(date === undefined){
      return <span style = { styles.head }>Date</span>;
    }

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
  
  //get genres
  handleGenre = (gen) =>{

    if(gen === undefined){
      return 'No genre was found';
    }
    //get the generes
    const newGen = gen.map((g) => {
      return g.name;
    });

    const allGenres = newGen.join('/');
    return allGenres;
  }

  //handle budget && revenue
  handleMoney = (money) =>{
    if(money === undefined || null){
      return 'Data not available';
    }
    return <CurrencyFormat value={money} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
  }

  //handle companies
  handleProductionCompanies = (companies) =>{
    console.log('companies', companies);
    if(companies === undefined){
      return 'No production company was found';
    }
    const comp = companies.map((c) => {
      console.log('company ',c.name);
      return c.name;
    });

    let allCompanies;
    if(comp.length > 1){
      allCompanies = comp.slice(0,2).join(' & ');
    }else{
      allCompanies = comp;
    }

    console.log('all comp', allCompanies);
    return allCompanies;
  }

  //overview
  overview = (id, name) =>{
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
    this.props.APIRequest(url, 'OVERVIEW_MOVIE');
    this.props.history.replace('./' + id + '+' + name, [{id : id}]);
  }

  componentDidUpdate(prevProps){

    if(prevProps.movie.overview.id !== this.props.movie.overview.id){
      const id = this.props.movie.overview.id;
      const url = 'https://api.themoviedb.org/3/movie/'+ id +'/similar?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1';
      const urlTrailer = 'https://api.themoviedb.org/3/movie/' + id +'/videos?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
      const urlCredit = 'https://api.themoviedb.org/3/movie/'+ id +'/credits?api_key=72049b7019c79f226fad8eec6e1ee889';
      this.props.APIRequest(url, MOVIE_SUGGESTION);
      this.props.APIRequest(urlTrailer, FETCH_TRAILER);
      this.props.APIRequest(urlCredit, MOVIE_CREDITS);
    }
  }
  
  handle
  
  
  
  render() {

    const { overview, trailer, suggetions, credits } = this.props.movie;                      //get trailer, overview and suggestions from props
    const imageUrl = 'https://image.tmdb.org/t/p/w500/' + overview.poster_path;               //poster path 
    let displaySuggestion;                                                                    //suggestions
    let displayTrailer;                                                                       //trailer 
    let displayCasts;                                                                         //credits
    let displayDirector;                                                                      //director
    let comma;

    
    //if trailer && suggestions && credits === undefined || null
    if(trailer === undefined || trailer === null){
      displayTrailer = (
        <div style = {{textAlign : 'center', width: '100%', height: '100%', display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
          <Icon style = {{fontSize : 130, margin : '1rem'}} type='warning'/>
          <h1>No trailer was found!</h1>
        </div>
      )
    }else if(trailer.results === undefined || trailer.results.length === 0){
      displayTrailer = (
        <div style = {{textAlign : 'center', width: '100%', height: '100%', display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
          <Icon style = {{fontSize : 80, margin : '1rem'}} type='warning'/>
          <h1>No trailer was found!</h1>
        </div>
      );
    }else if(trailer.results.length > 0 && this.state.visible === true){
      displayTrailer = <iframe width = '98%' height = '100%' src = {'https://www.youtube.com/embed/' + trailer.results[0].key} />
    }

    //get suggestions
    if(suggetions === undefined || suggetions === null){
      displaySuggestion = <Spin indicator={<Icon type="loading" style={{ margin : 40,fontSize: 50 }} spin />}/>;
    }else if(suggetions.results === undefined || suggetions.results.length === 0 ){
      displaySuggestion = <span>No related movies were found</span>
    }else if(suggetions.results.length > 0){
      if(suggetions.results.length > 10){
        displaySuggestion = suggetions.results.slice(0,6).map((s) => {
          return(
            <Col key = {s.id} xs = {8} sm={8} md={4} onClick = {()=> this.overview(s.id, s.title)}>
              <Suggestions 
                key = {s.title}
                poster = {s.poster_path}
                id = {s.id}
                title = {s.title}
              />
            </Col>
          )
        });
      }else{
        displaySuggestion = suggetions.results.map((s)=>{
          return(
            <Col key = {s.id} xs = {8} sm={8} md={4} onClick = {()=> this.overview(s.id, s.title)}>
              <Suggestions 
                key = {s.title}
                poster = {s.poster_path}
                id = {s.id}
                title = {s.title}
              />
            </Col>
          )
        });
      }
    }

    //get credits and director
    if(credits === undefined || credits === null){
      displayCasts = <p>No cast available</p>
      displayDirector = <p>Director was not found</p>
    }else{
      if(credits.cast.length === 0){
        displayCasts = <p>No cast was found</p>
      }else{
        const directors = credits.crew.filter((crew) => {
          if(crew.job === 'Director'){
            return crew;
          }
        });
        
        console.log('director === ', directors);
        if(directors.length === 0){
          displayDirector = <p>Data not available</p>
        }else{
          const tempDirector = directors.map((director) => {
            return director.name;
          });
          displayDirector = tempDirector.join(' & ');
        }

        if(credits.cast.length >= 15){
          displayCasts = credits.cast.slice(0,15).map((c, index) => {
            comma = ',';
            if(index === 14){
              comma = '.';
            }
            return(
              <Cast 
                key = {c.id}
                image = {c.profile_path} 
                name = {c.name} 
                id = {c.id}
                comma = {comma}
                character = {c.character}/>
            );
          });
        }else{
          displayCasts = credits.cast.map((c, index) => {
            comma = ',';
            if(index === 14){
              comma = '.';
            }
            return(
              <Cast 
                key = {c.id}
                image = {c.profile_path} 
                name = {c.name} 
                id = {c.id}
                comma = {comma}
                character = {c.character}/>
            );
          });
        }
      }
    }
    
    return (
      <div style = {{maxWidth : 1980, margin : '0 auto', width : '100%'}}>
        <div className = 'overview'>
          <Layout className = 'overview-media'>
            <div>
              <img className = 'overview-image' src = { overview.profile_path === null || overview.poster_path === undefined ? require('../asset/image_not_found.jpg') : imageUrl } alt = {overview.title}/>
            </div> 
          </Layout>
          <Layout className = 'overview-description'>
            <div className = 'overview-header'>
              <h1 style = { styles.title }>{overview.title}</h1>
              <div style = {{display : 'flex', justifyContent : 'flex-start', alignContent : 'center', alignItems : 'baseline', margin : '1rem 0'}}>
                <Tooltip title = 'Release date' placement = 'bottomLeft'>
                  <p>{this.handleDate(overview.release_date)}</p>
                </Tooltip>
                <Tooltip title = 'Average vote' placement = 'bottomLeft'>
                  <p><span style = { styles.head }><Icon type ='star'/> {overview.vote_average=== undefined ? 0 : overview.vote_average}</span></p>
                </Tooltip>
                <Tooltip title = 'Watch the trailer' placement = 'bottomLeft'>
                  <Button 
                    icon = 'play-circle' 
                    style = {{ backgroundColor : 'rgba(27, 38, 49, 0.56)', color : 'white', borderRadius : 25}}
                    onClick = {this.showModal}
                  >
                    Trailer
                  </Button>
                </Tooltip>
                <Modal
                  visible={this.state.visible}
                  footer = {null}
                  closable = {true}
                  onCancel = {this.handleCancel}
                  width = '75vw'
                  maskStyle = {{
                    backgroundColor : 'rgba(42, 45, 51, 0.98)'
                  }}
                  bodyStyle = {styles.modalBodyStyle}
                  style = {{
                    top : 30,
                    paddingBottom : 0
                  }}
                >
                  {displayTrailer}
                </Modal>
              </div>
              <Divider />
              <div>
                <p style = {{marginBottom : 0}}>{overview.overview}</p>
              </div>
            </div>
            <Divider />
            <div className = 'overview-review'>
              <div style = { styles.overview }>
                <h2 style = { styles.type }>Genres</h2>
                <p>{this.handleGenre(overview.genres)}.</p>
              </div>
              <div style = { styles.overview }>
                <h2 style = { styles.type }>Run Time</h2>
                <p>{overview.runtime !== undefined && overview.runtime !== null ? overview.runtime + ' mins' : 'Run time not available'}</p>
              </div>
              <div style = { styles.overview }>
                <h2 style = { styles.type }>Directed By</h2>
                {displayDirector}
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Cast</h2>
                <div style = {{display : 'flex', justifyContent : 'flex-start', alignItems : 'center', flexWrap : 'wrap', width : '90%'}}>
                  {displayCasts}
                </div>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Budget</h2>
                <div>
                  <p style = {styles.resP }>{this.handleMoney(overview.budget)}</p>
                </div>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Revenue</h2>
                <div>
                  <p style = {styles.resP }>{this.handleMoney(overview.revenue)}</p>
                </div>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Production Company</h2>
                <div>
                  <p style = {styles.resP }>{this.handleProductionCompanies(overview.production_companies)}</p>
                </div>
              </div>
            </div>
          </Layout>
        </div>
        <Divider />
        <div className='suggestion'>
          <Layout style = {{padding : '1rem'}}>   
            <h1>Related Movies</h1>
            <Row type = 'flex' gutter = {8} style = {{flexWrap : 'wrap', justifyContent : 'flex-start'}}>
              {displaySuggestion}
            </Row>
          </Layout>
        </div>
        <Divider />        
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return{
    movie : state.movies
  }
}

const styles = {
  container : {
    width : '100%',
    Heigth : '100%',
    padding : '1rem',
  },
  title : {
    marginBottom: 0,
    fontSize: '3rem',
  },
  head : {
    marginRight: '2rem',
    padding : '0.3rem 0.8rem',
    borderRadius : '25px',
    backgroundColor : 'rgba(27, 38, 49, 0.56)',
    color : 'white'
  },
  type : {
    marginRight : '0.5rem',
    marginBottom : '0.1rem',
    color: '#242425',
    fontSize : '1rem',
    fontWeight : '600',
    textTransform : 'uppercase'
  },
  resP : {
    marginBottom : 10,
    fontSize : 14, 
    lineHeight : '1.6rem', 
    width  : '90%'
  },
  modalBodyStyle  :{
    width : '100%',
    height : '90vh',
    backgroundColor : 'rgba(240, 242, 245, 0.99)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent : 'center',
    borderRadius : 5,
  },
  overview : {
    marginBottom : 10
  }
};

export default connect(mapStateToProps, { APIRequest })(OverviewMovie);
