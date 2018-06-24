import { BEGIN_FETCH, FETCH_FAILED,FETCHED_MOVIES, OVERVIEW_MOVIE, FETCH_TRAILER, MOVIE_SUGGESTION, MOVIE_CREDITS, NOW_UPCOMING_MOVIE } from '../constants';

//initial state
const initialState = {
  results : {},
  begin : false,
  failed : false,
  upcoming: {},
  overview : {},
  suggetions : {},
  trailer : null,
  credits : null,
};

//export module
export default (state = initialState, actions) =>{
  switch(actions.type){
    case BEGIN_FETCH :
      return {
        ...state,
        begin : true 
      };
    case FETCHED_MOVIES : 
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
    case OVERVIEW_MOVIE : 
      return {
        ...state,
        overview : actions.payload
      };
    
    case MOVIE_SUGGESTION : 
    return {
      ...state,
      suggetions : actions.payload
    };

    case NOW_UPCOMING_MOVIE :
      return {
        ...state,
        upcoming : actions.payload
      }
    case MOVIE_CREDITS : 
      return {
        ...state,
        credits : actions.payload
      }
    default : 
      return state;
  }
}