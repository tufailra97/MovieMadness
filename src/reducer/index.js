import { combineReducers } from 'redux';
import searchMovie from './reducerMovie';
import searchSerie from './reducerSerie';
import searchPeople from './reducerPeople';
import search from './reducerSearch';


export default combineReducers({
  movies : searchMovie,
  series : searchSerie,
  people : searchPeople,
  search : search,
});