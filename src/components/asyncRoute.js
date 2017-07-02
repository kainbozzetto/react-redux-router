import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash';

import { injectReducers } from '../actions/registry';


const moduleDefaultExport = module => module.default || module;

function esModule(module, forceArray) {
  if(isArray(module)) {
    return module.map(moduleDefaultExport);
  }

  const defaulted = moduleDefaultExport(module);
  return forceArray ? [defaulted]: defaulted;
}

export default function asyncRoute(getComponent, getReducers) {
  class AsyncRoute extends React.Component {
    static Component = null;
    static ReducersLoaded = false;

    state = {
      Component: AsyncRoute.Component,
      ReducersLoaded: AsyncRoute.ReducersLoaded,
    };

    componentWillMount() {
      const { Component, ReducersLoaded } = this.state;
      const shouldLoadReducers = !ReducersLoaded && getReducers;

      if(!Component || shouldLoadReducers) {
        const promises = [
          !Component
            ? getComponent().then(module => {
                const Component = esModule(module);
                AsyncRoute.Component = Component;
                return Component;
              })
            : Component,
          !ReducersLoaded && getReducers && getReducers().then(module => {
            const reducers = esModule(module, true);
            this.props.injectReducers(reducers);
            AsyncRoute.ReducersLoaded = true;
          })
        ];

        Promise.all(promises).then(([Component]) => {
          if(this._mounted) {
            this.setState({Component});
          } else {
            this.state.Component = Component;
          }
        });
      }
    }

    componentDidMount() {
      this._mounted = true;
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      injectReducers: reducers => dispatch(injectReducers(reducers)),
    };
  }

  return connect(null, mapDispatchToProps)(AsyncRoute);
}
