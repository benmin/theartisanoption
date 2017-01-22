//var React = require('react');

module.exports = React.createClass({
	displayName: 'NewsItem',
    
    createMarkup: function(str) {
        return { __html: str };
    },
    
	render: function() {
		return (
			<div className="news-item gw-box gw-box-shadow">
				<div className="news-item-header gw-row">
					<div className="news-item-date">
						{this.props.date}
					</div>
				</div>
				<div className="news-item-body" dangerouslySetInnerHTML={this.createMarkup(this.props.children)}>
				</div>
			</div>
		);
	}
});