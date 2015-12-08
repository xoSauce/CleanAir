'use strict';

var React = require('react');

export default class VentilationSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {showText: false}
  }
  toggleText(event){
    this.setState({showText: !this.state.showText});
    event.stopPropagation();
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getSomeRange(){
    var today = new Date();

    var hours = [0,1,2,3,4,10,11][this.getRandomInt(0,6)];
    // var minutes = today.getMinutes() + this.getRandomInt(0,100);
    var minutes = [0, 15, 30, 45][this.getRandomInt(0,3)];
    hours = hours % 10;
    var finish = hours + 1;
    var halfDay = (Math.random()>.5)?'am' : 'pm';
    var range = hours + ':' + ('0'+minutes).slice(-2) + ' ' + halfDay + '-' + finish + ':' + ('0'+minutes).slice(-2) + ' ' + halfDay;
    console.log(range);
    return range;
  }
  render(){
    var range = this.getSomeRange();
    return(
      <div onClick={this.toggleText.bind(this)}>
        <div className={"sidebar-info sidebar-green resizable-btn"}>{this.props.title}</div>
        <div style={((this.state.showText)? {}: {display: 'none'})}>
          <div className="text-box">
            <p>Outdoor air pollution is a known contributor to indoor air pollution quality. If you choose or are living at this location you should:</p>
            <p>Ventilate your home between <strong>{range}</strong> as this is when the levels of pollution in your surrounding area are at their lowest.</p>
            <p>It is important to ventilate your home on a daily basis. 90% of time is spent in the home. It is estimated that the levels of pollution inside your home on average is 2-5 times greater than outdoors.</p>
            <p>Choosing to open windows for ventilation on the side of the house not facing a busy street is also another precaution which can be taken to reduce your pollution intake.</p>
            <p>For more information on how you can reduce your indoor levels of pollution exposure visit: <a href="http://www3.epa.gov/airquality/peg_caa/reduce.html">http://www3.epa.gov/airquality/peg_caa/reduce.html</a></p>
          </div>
        </div>
      </div>
    )
  }
}
