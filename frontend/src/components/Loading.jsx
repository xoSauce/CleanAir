'use strict';

var React = require('react');


export default class Loading extends React.Component {
  render(){
    return(
       <div className="loading-modal modal-wrapper">
         <div className="modal-inner">
           Loading
         </div>
       </div>
     )
   }
}
