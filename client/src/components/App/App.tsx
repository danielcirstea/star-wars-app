import React from 'react';
import config from '../../config';
import Characters from '../Characters/Characters';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Details from '../Details/Details';

interface Props {}
interface State {
  config: any,
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      config: config,
    }
  }

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/characters" />} />
            <Route exact path="/characters" render={() => <Characters config={this.state.config} />} />
            <Route exact path="/details/:id" render={() => <Details config={this.state.config} />}/>
            <Route exact path="*" render={() => <Redirect to="/characters" />} />
          </Switch>
        </Router>
    );
  }
}

export default App;
