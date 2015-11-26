import React, { Component } from 'react';
import LocalStorageMixin from 'react-localstorage';

var App = React.createClass({
  mixins: [LocalStorageMixin],
  render: function() {
    let {children} = this.props;
    return (
      <div>nav and shit
        {children}
      </div>
    );
  }
});

module.exports = App