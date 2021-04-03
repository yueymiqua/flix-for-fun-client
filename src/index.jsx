import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'; //importing Store from redux
import { Provider } from 'react-redux'; // Wraps your entire app in a provider so that your Store is accessible in your entire app
import { devToolsEnhancer } from 'redux-devtools-extension';
import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers'; // importing the reducers to be used in the Store

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView/>
        </Container>
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);