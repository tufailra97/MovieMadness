import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions'
import DisplayItemSerie from '../components/DisplayItemSerie'; 
import Filter from '../components/Filter';
import DrPagination from '../components/DrPagination';
import Footer from '../components/Footer';
import { Layout, Divider, Icon, Spin, Row} from 'antd';
import { FETCHED_SERIES } from '../constants';

//Home component 
class Series extends Component {
  constructor(){
    super();

    document.title = 'Movie Madness | Series';
    this.state = {
      url : null,
      page : 1,
    }
  }

  //make request before the render method is invoked
  componentWillMount(){
    //discovery series url
    const discoverUrlSeries = 'https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&page=1&sort_by=popularity.desc&language=en-US&api_key=72049b7019c79f226fad8eec6e1ee889';
    
    //call the fetch function and pass the url
    this.fetchSeries(discoverUrlSeries, FETCHED_SERIES);
  }

  fetchSeries = (url, type) => {
    this.props.APIRequest(url, type);
  }

  handleFilter = (url) =>{
    this.setState({
      url : url,
      page : 1
    }, () => this.fetchSeries(this.state.url, FETCHED_SERIES));
  }

  //handle Page
  handleChangePageMovie = (page) =>{
    let url;
    this.setState({
      page : page
    });
    if(this.state.url === null){
      url = 'https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&sort_by=popularity.desc&language=en-US&api_key=72049b7019c79f226fad8eec6e1ee889&page=' + page;
    }else{
      url = this.state.url + '&page=' + page;
    }
    console.log('Url in handle page', url);
    this.fetchSeries(url, FETCHED_SERIES);
  }


  //render
  render() {
    const series = this.props.series.results;                                       //series
    let displaySeries;                                                              //display series
    const antIcon = <Icon type="loading" style={{ margin : 100,fontSize: 24 }} spin />;     //spinner

    //if series and series is undefined, display a spinner
    if(series.results === undefined){
      displaySeries = <Spin indicator={antIcon} />
    }else {
      if(series.results.length === 0){
        displaySeries = <p style = {{margin : 20, fontSize : '1.5rem', fontWeight : 600}}> No result was found</p>
      }else{
        displaySeries = series.results.map((serie) => {
          return <DisplayItemSerie key = {serie.id} serie = {serie} history = {this.props.history} />
        });
      }
    }
    return (
      <div>
        <div className='header'>
          Series
        </div>
        <Divider />
        <Layout style = {{display : 'flex', flexDirection : 'column', alignContent : 'flex-start', paddingBottom : '2rem'}}>
          <Filter type = 'tv' url = {this.handleFilter}/>
          <Row type = 'flex' style = { styles.row }>
            {displaySeries}
          </Row>
          <DrPagination 
            total = { series.total_results } 
            page = { this.handleChangePageMovie } 
            currentPage = { this.state.page } 
          />
        </Layout>
        <Divider/>

        <Footer/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return{
    series : state.series
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
  }
}

export default connect(mapStateToProps, { APIRequest })(Series);