import React from 'react';
import { connect } from 'react-redux';

import { increaseCount, decreaseCount } from '../actions/countActions';


class Count extends React.Component {
  render() {
    return (
      <div>
        <div>Count: {this.props.count}</div>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.countReducer.number,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch(increaseCount()),
    decrement: () => dispatch(decreaseCount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Count);
