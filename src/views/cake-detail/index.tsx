import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetCake } from '../../actions/cake';
import CakeDetailInner from '../../components/cake-detail-inner/cake-detail-inner';
import { Cake } from '../../models';
import { CakesAppState } from '../../reducers';
import './cake-detail.scss';
import { Columns, Column } from 'bloomer';

export interface CakeDetailProps {
  match: any;
  error?: Error,
  cake?: Cake,
  loading: boolean,
  getCake: (id: string) => (id: string) => void
}

class CakeDetail extends Component<CakeDetailProps> {
  componentDidMount = () => this.props.getCake(this.props.match.params.id);

  render() {
    const { cake, loading, error } = this.props;

    return (
    <Columns>
      <Column>{loading ? <p>Loading...</p> :
        (error ? <p>Cake not found</p> :
        (cake ? <CakeDetailInner cake={cake}></CakeDetailInner> : ''))}
      </Column>
    </Columns>);
  }
}

const mapStateToProps = (state: CakesAppState, compProps: CakeDetailProps) => {
  return {
    cake: state.cake.cake,
    loading: state.cake.loading,
    error: state.cake.error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCake: (id: string) => dispatch(actionGetCake(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeDetail);
