'use strict';

var React = require('react');


export default class Loading extends React.Component {
  componentDidMount(){
    if(this.props.params.type === 't'){
      var _this = this;
      setTimeout(
      function(){
        _this.props.history.replaceState(null, '/map');
      },
      500);
    }
  }
  render(){
    return(
       <div className="loading-modal modal-wrapper">
         <div className="plus-loader">
         </div>
       </div>
     )
   }
}
