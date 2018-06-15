import { BEGIN_FETCH, FETCH_FAILED } from '../constants';
import axios from 'axios';


//fetch movie
const APIRequest = (url, type) => {
  return dispatch => {
    //dispatch begin fetching
    dispatch({
      type : BEGIN_FETCH,
    })
    //make a get request to get the movies 
    axios.get(url)
      .then((res) => {
        //dispatch data if fetched 
        dispatch({type : type, payload : res.data});
      })
      .catch((err) => {
        //dispatch error if error
        console.log(err);
        dispatch({type : FETCH_FAILED});
    });
  }
  //return the result after the request
}

export default APIRequest;   