'use strict';

var React = require('react');

export default class Section extends React.Component {
  constructor(props){
    super(props);
    this.state = {showText: false}
  }
  toggleText(event){
    this.setState({showText: !this.state.showText});
    event.stopPropagation();
  }
  render(){
    return(
      <div onClick={this.toggleText.bind(this)}>
        <h1>{this.props.title}</h1>
        <div style={((this.state.showText)? {}: {display: 'none'})}>
          {this.props.text.map(function(x){return <p>{x}</p>})}
        </div>
      </div>
    )
  }
}
