import React from 'react';
import { thisExpression } from '@babel/types';


export default function WzynHigher(Component) {
  class WrapComponent extends React.Component {
    state = {}
    _handelChange = (key, val) => {
      this.setState({
        [key]: val
      })
    }
    render() {
      return (
        <div>
          <Component {...this.props} state={this.state} _handelChange={this._handelChange} />
        </div>
      )
    }
  }
  return WrapComponent
}