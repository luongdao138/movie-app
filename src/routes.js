import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as pages from './pages';

const RouteConfig = ({ children }) => {
  return (
    <Router>
      {children}
      <Switch>
        <Route path='/' component={pages.Home} exact />
        <Route path='/watched' component={pages.Watched} />
        <Route path='/watchlist' component={pages.WatchList} />
      </Switch>
    </Router>
  );
};

export default RouteConfig;
