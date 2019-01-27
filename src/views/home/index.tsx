import { Button } from 'bloomer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionGetCakes } from '../../actions/cakes';
import CakeList from '../../components/cake-list/cake-list';
import { Cake } from '../../models';
import { CakesAppState } from '../../reducers';
import './home.scss';

interface HomeProps {
  getCakes: () => () => void,
  cakes: Cake[],
  loading: boolean,
  error?: Error
};

class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.getCakes();
  }

  render() {
    const { cakes, loading, error } = this.props;
    return (
      <div>
        <Link to="/create">
          <Button isColor="primary">
            Add Cake
          </Button>
        </Link>
        <div>{loading ? <h2>Loading...</h2> : (error ? <h2>Could not load cakes. Sad, sad times. :(</h2> : <CakeList cakes={cakes!}></CakeList>)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: CakesAppState, compProps: HomeProps) => {
  return {
    cakes: state.cakes.cakes,
    loading: state.cakes.loading,
    error: state.cakes.error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCakes: () => dispatch(actionGetCakes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
