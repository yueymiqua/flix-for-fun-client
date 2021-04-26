import { combineReducers } from 'redux';

import { 
    SET_MOVIES, 
    SET_FILTER,
    SET_USER,
    SET_FAVORITE_MOVIES
} from '../actions/actions';

function visibilityFilter(state='', action) {
  switch(action.type){
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state=[], action) {
  switch(action.type){
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state=null, action) {
  switch(action.type){
    case SET_USER:
      return action.value;
    default: 
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch(action.type) {
    case SET_FAVORITE_MOVIES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies
});
// Same as saying:
// function movieApp(state={}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         movies: movies(state.movies, action)
//     }
// }

export default moviesApp;