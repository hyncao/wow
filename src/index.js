import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Routes from 'app/Router';
import rootStore from 'app/stores';
import * as serviceWorker from './serviceWorker';

configure({ enforceActions: 'always' });

ReactDOM.render(
  <Provider {...rootStore}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
