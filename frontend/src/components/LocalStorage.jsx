var React = require('react');
var ReactDOM = require('react-dom');
var LocalStorageMixin = require('react-localstorage');
var CleanAirApp = React.createClass({
  mixins: [LocalStorageMixin],
  getInitialState: function(){
    return {
      lsTest: 'Change me'
    };
  },
  render: function(){
    return (
      <div>
        <h1>The CleanAir Frontend App</h1>
        <h2>Built in UCL</h2>
        <label>The text below persists across tab closes</label>
        <div>
          <input type="text" onChange={this.handleChange} value={this.state.lsTest}/>
        </div>
      </div>
    )
  },
  handleChange: function(event){
    this.setState({lsTest: event.target.value});
  }
});

ReactDOM.render(
  <CleanAirApp/>,
  document.getElementById('app')
);
