import React from 'react';
import { connect } from 'react-redux';

import { setName, setEmail } from '../actions/userActions';


class User extends React.Component {
  constructor() {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.props[`set${event.target.name}`](event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <input type='text' name='Name' value={this.props.user.name} onChange={this.handleOnChange} />
          Name: {this.props.user.name}
        </div>
        <div>
          <input type='email' name='Email' value={this.props.user.email} onChange={this.handleOnChange} />
          Email: {this.props.user.email}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setName: name => dispatch(setName(name)),
    setEmail: email => dispatch(setEmail(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
