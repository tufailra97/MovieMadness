import { BEGIN_FETCH, FETCH_FAILED, OVERVIEW_PEOPLE } from '../constants';

//initial state
const initialState = {
  results : {},
  begin : false,
  failed : false
};

//export module
export default (state = initialState, actions) =>{
  switch(actions.type){
    case BEGIN_FETCH :
      return {
        ...state,
        begin : true 
      };
    case FETCH_FAILED : 
      return {
        ...state,
        failed : true
      };
    case OVERVIEW_PEOPLE:
      return {
        ...state,
        results : actions.payload
      }
    default : 
      return state;
  }
}