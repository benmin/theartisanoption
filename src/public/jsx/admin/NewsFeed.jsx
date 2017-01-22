//var React = require('react');
//var moment
var NewsItem = require('./NewsItem');

module.exports = React.createClass({
    displayName: 'NewsFeed',
    
    componentDidMount: function() {
        this.retrievePosts();
        console.log('Posts have been retrieved.');
    },
    
    getInitialState: function() {
        return {
			posts: []
        };
    },
    
    retrievePosts: function() {
		var me = this;
	
		fetch('/api/newsfeed/posts', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
            
            for(let i = 0; i < data.length; i++) {
                data[i].date = moment(data[i].date).format('MMMM Do YYYY');
//                data[i].date = moment(data[i].date).format('dddd, MMMM Do YYYY');
            }
//			var posts = [];
//			
//			data = data.data;
//			
//			for(let i = 0; i < data.length; i++) {
//				if(data[i].message) {
//					posts.push(data[i]);
//				}
//			}
			
			me.setState({
				posts: data
			});
		});
	},
    
    render: function() {
        return (
            <div id="news">
                <div id="news-feed" className="gw-column">
                    <div id="news-title" className="gw-box gw-box-shadow">News Feed</div>
                    {/*
                    <div className="fb-page" data-href="https://www.facebook.com/localmakerconnect/" data-tabs="timeline" data-width="500" data-small-header="false" data-adapt-container-width="false" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/localmakerconnect/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/localmakerconnect/">Local Maker Connect</a></blockquote></div>
                    {this.state.posts.map(function(post, i) {
                        var src = "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" +
                                  "localmakerconnect%2Fposts%2F" + post.id.split('_')[1] + "&width=500";
                        return <iframe key={i} src={src} width="500" height="500" scrolling="no"
                                   frameBorder="0" allowTransparency="true"></iframe>
                    })}
                    */}
                    {this.state.posts.map(function(post, i) {
                        return <NewsItem key={i} date={post.date}>{post.message}</NewsItem>;
                    })}
                    
                    {/*
                    <div className="fb-page" data-href="https://www.facebook.com/mailleknitter/" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/mailleknitter/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/mailleknitter/">MailleKnitter</a></blockquote></div>
                    */}
                </div>
            </div>
        );
    }
});