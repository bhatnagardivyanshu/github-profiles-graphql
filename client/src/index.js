import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./App.css";

import Users from "./components/Users";
import RepositoryList from "./components/RepositoryList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Github Profile</h1>
          <Router>
            <p>
              <Link to="/">Home</Link>
            </p>
            <Switch>
              <Route exact path="/" component={Users} />
              <Route exact path="/repos/:username" component={RepositoryList} />
              <Route
                component={() => <h4>Oops! This is not a valid route</h4>}
              />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
