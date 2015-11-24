import React, { Component } from 'react';

export default class App extends React.Component {
  render() {
    let {children} = this.props;
    return (
      <div>
        <h1>Parent View</h1>
        {children}
      </div>
    );
  }
}
