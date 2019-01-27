import { Container, Icon, Navbar } from 'bloomer';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.scss';
import Create from './views/create';
import CakeDetail from './views/cake-detail';
import Home from './views/home';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Container isFluid>
        <Navbar>
          <NavbarBrand>
            <NavbarItem>
              <Link to="/">Cakes</Link>
            </NavbarItem>
          </NavbarBrand>
          <NavbarEnd>
            <NavbarItem href="https://github.com/doverton51/react-cakes">
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
