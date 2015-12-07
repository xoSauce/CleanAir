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
        <div className={"sidebar-info sidebar-green"}>{this.props.title}</div>
        <div style={((this.state.showText)? {}: {display: 'none'})}>
          <div className="text-box">
            {this.props.text.map(function(x){return <p>{x}</p>})}
          </div>
        </div>
      </div>
    )
  }
}
