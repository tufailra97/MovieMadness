import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cast from '../components/Cast';
import Suggestions from '../components/Suggestions';
import Footer from '../components/Footer';
import { APIRequest } from '../actions';
import { FETCH_TRAILER, SERIE_SEGGESTION, SERIE_CREDITS, OVERVIEW_SERIE } from '../constants';
import {Layout, Divider, Button, Icon, Modal, Spin, Tooltip, Row, Col } from 'antd';

class OverviewSerie extends Component {  
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

  handleCreatedBy = (c) =>{
    let comma = ', ';
    if(c === undefined){
      return null;
    }else{
      if(c.length === 1){
        return c.map((creator) =>{
          return creator.name;
        });
      }else{
        return c.map((creator, index)=>{
          if(c[index + 1] === undefined){
            comma = '.';
          }
          return creator.name + comma;
        });
      }
    }
  }

  //handle companies
  handleProductionCompanies = (companies) =>{
    if(companies === undefined){
      return 'No production company was found';
    }
    const comp = companies.map((c) => {
      return c.name;
    });

    let allCompanies;
    if(comp.length > 3){
      allCompanies = comp.slice(0,3).join(', ');
    }else{
      allCompanies = comp.join(', ');
    }

    return allCompanies;
  }

  handleRuntime = (runTime) => {
    if(runTime === undefined){
      return 'No run time is available';
    }else{
      return runTime[0];
    }
  }

  //overview
  overview = (id, name) =>{
    const url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
    this.props.APIRequest(url, OVERVIEW_SERIE);
    this.props.history.replace('./' + id + '+' + name, [{id : id}]);
  }

  componentDidUpdate(prevProps){

    if(prevProps.serie.overview.id !== this.props.serie.overview.id){
      const id = this.props.serie.overview.id;
      const url = 'https://api.themoviedb.org/3/tv/'+ id +'/similar?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&page=1';
      const urlTrailer = 'https://api.themoviedb.org/3/tv/' + id +'/videos?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US';
      const urlCredit = 'https://api.themoviedb.org/3/tv/'+ id +'/credits?api_key=72049b7019c79f226fad8eec6e1ee889';
      this.props.APIRequest(url, SERIE_SEGGESTION);
      this.props.APIRequest(urlTrailer, FETCH_TRAILER);
      this.props.APIRequest(urlCredit, SERIE_CREDITS);
    }
  }
  
  
  
  
  render() {

    const { overview, trailer, suggetions, credits } = this.props.serie;                      //get trailer, overview and suggestions from props
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
      displayTrailer = <iframe width = '98%' height = '100%' src = {'https://www.youtube.com/embed/' + trailer.results[0].key} title = {trailer.id} />
    }

    //get suggestions
    if(suggetions === undefined || suggetions === null){
      displaySuggestion = <Spin indicator={<Icon type="loading" style={{ margin : 40,fontSize: 50 }} spin />}/>;
    }else if(suggetions.results === undefined || suggetions.results.length === 0 ){
      displaySuggestion = <span>No related eries were found</span>
    }else if(suggetions.results.length > 0){
      if(suggetions.results.length > 10){
        displaySuggestion = suggetions.results.slice(0,6).map((s) => {
          return(
            <Col key = {s.id} xs = {8} sm={8} md={4} onClick = {()=> this.overview(s.id, s.name)}>
              <Suggestions 
                key = {s.id}
                poster = {s.poster_path}
                id = {s.id}
                title = {s.name}
              />
            </Col>
          )
        });
      }else{
        displaySuggestion = suggetions.results.map((s)=>{
          return(
            <Col key = {s.id} xs = {8} sm={8} md={4} onClick = {()=> this.overview(s.id, s.name)}>
              <Suggestions 
                key = {s.id}
                poster = {s.poster_path}
                id = {s.id}
                title = {s.name}
              />
            </Col>
          )
        });
      }
    }

    //get credits and director
    if(credits === undefined || credits === null){
      displayCasts = <p>Loading</p>
    }else{
      if(credits.cast.length === 0){
        displayCasts = <p>No cast is available</p>
      }else{
        if(credits.cast.length >= 15){

          const directors = credits.crew.filter((crew) => {
            if(crew.job === 'Director'){
              return <span key = {crew.id}>{crew.name}</span>;
            }else 
              return null;
          });

          displayDirector = directors.map((d, index) => {
            return <span key = {d.id}>{d.name + comma}</span>
          });

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
              <img className = 'overview-image' src = { imageUrl } alt = {overview.name}/>
            </div> 
          </Layout>
          <Layout className = 'overview-description'>
            <div className = 'overview-header'>
              <h1 style = { styles.title }>{overview.name}</h1>
              <div style = {{display : 'flex', justifyContent : 'flex-start', alignContent : 'center', alignItems : 'baseline', margin : '1rem 0'}}>
                <Tooltip title = 'First Air' placement = 'bottomLeft'>
                  <p>{this.handleDate(overview.first_air_date)}</p>
                </Tooltip>
                <Tooltip title = 'Average vote' placement = 'bottomLeft'>
                  <p><span style = { styles.head }><Icon type ='star'/> {overview.vote_average === undefined ?'0':overview.vote_average}</span></p>
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
                <h2 style = { styles.type }>Episode Run Time</h2>
                <p>{this.handleRuntime(overview.episode_run_time)} mins.</p>
              </div>
              <div style = { styles.overview }>
                <h2 style = { styles.type }>Created By</h2>
                <p>{this.handleCreatedBy(overview.created_by)}</p>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Cast</h2>
                <div style = {{display : 'flex', justifyContent : 'flex-start', alignItems : 'center', flexWrap : 'wrap', overflow : 'hidden', width : '90%', marginBottom : 10}}>
                  {displayCasts}
                </div>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Total Seasons</h2>
                <div>
                  <p style = {styles.resP }>{overview.number_of_seasons === undefined ? '0': overview.number_of_seasons}</p>
                </div>
              </div>
              <div styles = { styles.overview }>
                <h2 style = { styles.type }>Total of Episodes</h2>
                <div>
                  <p style = {styles.resP }>{overview.number_of_episodes === undefined ? '0': overview.number_of_episodes}</p>
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
            <h1>Related Series</h1>
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
    serie : state.series
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
  }
};

export default connect(mapStateToProps, { APIRequest })(OverviewSerie);
