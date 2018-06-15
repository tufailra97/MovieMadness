import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIRequest } from '../actions'
import DisplayItemSerie from '../components/DisplayItemSerie'; 
import Filter from '../components/Filter';
import DrPagination from '../components/DrPagination';
import Footer from '../components/Footer';
import { Layout, Divider, Icon, Spin, Row} from 'antd';

//Home component 
class Series extends Component {
  constructor(){
    super();

    document.title = 'Mr Movie | Series';
    this.state = {
      url : '',
      page : 1,
    }
  }

  //make request before the render method is invoked
  componentWillMount(){
    //url
    const discoverUrlSeries = 'https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&page=1&sort_by=popularity.desc&language=en-US&api_key=72049b7019c79f226fad8eec6e1ee889';
    
    //requests 
    this.fetchSeries(discoverUrlSeries);
  }

  fetchSeries = (url) => {
    this.props.APIRequest(url,  'FETCHED_SERIES');
  }

  handleFilter = (url) =>{
    this.fetchSeries(url);
  }

  //handle Page
  handleChangePageMovie = (page) =>{
    const url = 'https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&sort_by=popularity.desc&language=en-US&api_key=72049b7019c79f226fad8eec6e1ee889&page=1' + page;  
    this.fetchSeries(url);
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
      displaySeries = series.results.map((serie) => {
        return <DisplayItemSerie key = {serie.id} serie = {serie} history = {this.props.history} />
      });
    }
    return (
      <div>
        <div className='header'>
          Series
        </div>
        <Divider />
        <Layout style = {{display : 'flex', flexDirection : 'column', alignContent : 'flex-start', paddingBottom : '2rem'}}>
          <Filter />
          <Row type = 'flex' style = { styles.row }>
            {displaySeries}
          </Row>
        </Layout>
        <DrPagination 
          total = { series.total_results } 
          page = { this.handleChangePageMovie } 
          currentPage = { this.state.page } 
        />
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