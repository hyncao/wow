import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { preUri } from 'app/lib/constant';
import * as pages from 'app/pages';
import { routeConfig } from 'config';

const globalAppSource = preUri;

const SetTitleRoute = ({ title, ...rest }) => {
  console.log(rest.component)
  if (title) {
    document.title = title;
  }
  return <Route {...rest} exact />;
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {routeConfig.map((item, index) => (
        <SetTitleRoute
          key={index}
          title={item.title}
          path={globalAppSource + item.path}
          component={pages[item.page]}
        />
      ))}
      <Redirect path="*" to={`${globalAppSource}index`} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
