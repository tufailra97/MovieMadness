import { SEARCH, BEGIN_FETCH, FETCH_FAILED } from '../constants';

//initial state
const initialState = {
  begin : false,
  failed : false,
  search : {}
};

//export module
export default (state = initialState, actions) =>{
  switch(actions.type){

    case BEGIN_FETCH : 
      return {
        ...state,
        begin : true
      }
    
    case FETCH_FAILED :
      return {
        ...state,
        failed : true
      }
    case SEARCH : 
    return {
      ...state,
      search : actions.payload
    }

    default : 
      return state;
  }
}