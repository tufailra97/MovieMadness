import { FETCHED_SERIES, BEGIN_FETCH, FETCH_FAILED, OVERVIEW_SERIE, SERIE_SEGGESTION, SERIE_CREDITS, FETCH_TRAILER } from '../constants';

//initial state
const initialState = {
  results : [],
  begin : false,
  failed : false,
  overview : {},
  trailer : null,
  suggetions : {},
  credits : null
};

//export module
export default (state = initialState, actions) =>{
  switch(actions.type){
    case BEGIN_FETCH :
      return {
        ...state,
        begin : true 
      };
    case FETCHED_SERIES : 
      return {
        ...state,
        results : actions.payload
      };
    case FETCH_TRAILER :
      return {
        ...state,
        trailer : actions.payload
    };
    case FETCH_FAILED :
      return {
        ...state,
        failed : true
      };
    case OVERVIEW_SERIE : 
      return {
        ...state,
        overview : actions.payload
      };
    
    case SERIE_SEGGESTION : 
    return {
      ...state,
      suggetions : actions.payload
    };
    
    case SERIE_CREDITS : 
      return {
        ...state,
        credits : actions.payload
      }
    default : 
      return state;
  }
}