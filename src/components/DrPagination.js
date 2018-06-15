import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class DrPagination extends Component {

  //on change page set the new page
  handleChangePage = (page) =>{
    console.log('PAGE IN HANDLE PAGE', page);
    this.setState({
      activePage : page
    });
    this.props.page(page);
  }


  render() {
    let total;
    if(this.props.total > 1000){
      total = 1000;
    }else{
      total = this.props.total;
    }
    return (
      <div style = {styles.container}>
        <Pagination 
            current = {this.props.currentPage}
            total = {total} 
            defaultPageSize = {20}
            onChange = {this.handleChangePage}
            size = 'small'
            showQuickJumper
          />
      </div>
    )
  }
};

const styles = {
  container : {
    width : '100%',
    margin: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
}