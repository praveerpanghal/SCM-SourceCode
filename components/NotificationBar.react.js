/** @jsx React.DOM */

var React = require('react');

module.exports = NotificationBar = React.createClass({
  render: function(){
    var count = this.props.count;
    return (
      <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
        <p>There are {count} </p>
      </div>
    )
  }
});