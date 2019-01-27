import { Container, Icon, Navbar, NavbarEnd, NavbarItem } from 'bloomer';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.scss';
import CakeDetail from './views/cake-detail';
import Create from './views/create';
import Home from './views/home';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Container>
        <Navbar className="is-transparent">
          <NavbarBrand>
            <NavbarItem>
              <Link to="/">Cakes</Link>
            </NavbarItem>
          </NavbarBrand>
          <NavbarEnd className="is-hidden-touch">
            <NavbarItem target="_blank" href="https://github.com/doverton51/react-cakes">
              <Icon className='fa fa-github' /> View on GitHub
            </NavbarItem>
          </NavbarEnd>
        </Navbar>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/cake/:id" component={CakeDetail} />
        </main>
      </Container>
    </Router>
  );
}

export default App;
