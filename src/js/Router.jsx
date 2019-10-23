import React from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { preUrl } from 'app/lib/constant';
import { CSSTransition } from 'react-transition-group';
import * as pages from './pages';
import routeConfig from './router.config';
import '../styles/app.scss';

const globalAppSource = preUrl;

const SetTitleRoute = ({ title, ...rest }) => {
  if (title) {
    document.title = title;
    window.ant.setTitle(title);
  }
  return <Route {...rest} exact />;
};

const Routes = ({ transitionStore: { transitionFlag } }) => (
  <CSSTransition
    in={transitionFlag}
    timeout={300}
    classNames="reactTransition"
  >
    <BrowserRouter>
      <Switch>
        {routeConfig.map((item, index) => (
          <SetTitleRoute
            key={index}
            title={item.title}
            path={globalAppSource + item.path}
            component={pages[item.component]}
          />
        ))}
        <Redirect path="*" to={`${globalAppSource}index`} />
      </Switch>
    </BrowserRouter>
  </CSSTransition>
);

export default inject('transitionStore')(observer(Routes));
