import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

//sidebar component that renders the sidebar
class SideBar extends Component {
  state = {
    collapsed: true,
  };

  //on collapse change the state to false
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render(){
    return(
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme = 'light'
          style = {{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex : '1'}}
          width = '150px'
        >
          <NavLink to = '/'>
            <div className="logo">
              <img src = {require('../asset/logo.svg')} alt = 'MovieMadness'/>
              <span className = {this.state.collapsed === false? 'name' : 'name-hide' }>MovieMadness</span>
            </div>
          </NavLink>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <NavLink to='/'>
                <Icon type="home" />
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to='/movies'>
                <Icon type="video-camera" />
                <span>Movie</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to='/series'>
                <Icon type="desktop" />
                <span>Series</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink to='/search'>
                  <Icon type="search" />
                  <span>Search</span>
                </NavLink>  
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}


export default SideBar;