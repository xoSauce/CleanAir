var React = require('react');
var ReactDOM = require('react-dom');
var CleanAirApp = React.createClass({
  render: function(){
    return (
      <div>
        <h1>The CleanAir Frontend App</h1>
        <h2>Built in UCL</h2>
      </div>
    )
  }
});

ReactDOM.render(
  <CleanAirApp/>,
  document.getElementById('app')
);
