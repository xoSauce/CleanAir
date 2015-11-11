var React = require('react');
var ReactDOM = require('react-dom');
var CleanAirApp = React.createClass({
  render: function(){
    return (
      <div>
        CleanAir
      </div>
    )
  }
});

ReactDOM.render(
  <CleanAirApp/>,
  document.getElementById('app')
);
