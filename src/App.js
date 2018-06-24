import React, { Component } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import ErrorPage from './pages/ErrorPage';
import SideBar from './components/SideBar';
import Overview from './pages/Overview';
import Search from './pages/Search';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';
import OverviewSeries from './pages/OverviewSeries';
import OverviewPerson from './pages/OverviewPerson';

class App extends Component {
  render() {
    return (
      <Router basename = {process.env.PUBLIC_URL}>
        <Layout>
          <SideBar />
          <Layout style={{marginLeft : 80, padding : 15, backgroundColor : 'white', height : '100vh'}}>
            <Switch>
              <Route exact path="/" render={() => (
                  <Redirect to={process.env.PUBLIC_URL + "/home"}/>
              )}/>
              <Route exact path={process.env.PUBLIC_URL + '/home'} component = {Home}/>
              <Route path='/movies' component = {Movies}/>
              <Route path='/series' component = {Series}/>
              <Route path='/search' component = {Search}/>
              <Route path='/overview/:item' component = {Overview}/> 
              <Route path='/overviewSerie' component = {OverviewSeries} />
              <Route path='/overviewPerson' component = {OverviewPerson} />
              <Route path='*'  component = {ErrorPage}/>
            </Switch>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
