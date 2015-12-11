'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class Section extends React.Component {
  constructor(props){
    super(props);
    this.state = {showText: false}
  }
  toggleText(event){
    this.setState({showText: !this.state.showText});
  }
  render(){
    var combinedText = this.props.text.map(function(x){return <p>{x}</p>});
    var noText= <div>Please fill out the <Link to="/map/user-modal">user information tab</Link> to view information and recommendations personalised to suit you specifically.<br/><Link to="/map/user-modal">Click Here</Link></div>;
    var text = (this.props.text.length>0)? combinedText : noText;
    return(
      <div onClick={this.toggleText.bind(this)}>
        <div className={"sidebar-info sidebar-green resizable-btn"}>{this.props.title}</div>
        <div style={((this.state.showText)? {}: {display: 'none'})}>
          <div className="text-box">
            {text}
          </div>
        </div>
      </div>
    )
  }
}
