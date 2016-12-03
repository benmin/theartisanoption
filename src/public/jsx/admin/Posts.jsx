//var ReactDOM = require('react-dom');
//var React = require('react');

//require('../css/style.css');
//require('../css/admin.css');

var Posts = React.createClass({
    displayName: 'Posts',
    
    getInitialState: function() {
        return {
			posts: [],
            activePost: {}
        };
    },
    
    componentDidMount: function() {
        this.retrievePosts();
        console.log('Posts have been retrieved.');
    },
    
    createMarkup: function(str) {
        return { __html: str };
    },
    
    updateMessage: function(event) {
        var post = this.state.activePost;
        post.message = event.target.value;
        
		this.setState({
			activePost: post
		});
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
//			var posts = [];
//			
//			data = data.data;
//			
//			for(let i = 0; i < data.length; i++) {
//                posts.push(data[i]);
//			}
			
			me.setState({
				posts: data
			});
		});
	},
    
    savePost: function() {
        var me = this;
        
        console.log('saving post');
        
        fetch('/admin/post', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(me.state.activePost)
        }).then(function(response) {
			return response.json();
		}).then(function(data) {
            me.retrievePosts();
            me.clear();
//            console.log(data, data.success);
        });
    },
    
    editPost: function(post) {
        this.setState({
            activePost: {
                __v: post.__v,
                _id: post._id,
                message: post.message.replace(/<br \/>/g, '\n'),
                date: post.date
            }
        });
    },
    
    deletePost: function(post) {
        var me = this,
            postId = post._id;
        
        console.log('deleting...');
        
        fetch('/admin/post/' + postId, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            me.retrievePosts();
            if(me.state.activePost._id === postId) {
                me.clear();
            }
        });
    },
    
    clear: function() {
        ReactDOM.findDOMNode(this.refs.editor).value = '';
        
        this.setState({
            activePost: {}
        });
    },
    
    render: function() {
        return (
            <div className="gw-column">
                <div id="add-post" className="gw-box gw-box-shadow">
                    <div className="gw-row">
                        <textarea ref="editor" value={this.state.activePost.message} onChange={this.updateMessage}></textarea>
                    </div>
                    <div className="gw-row">
                        <button type="button" onClick={this.savePost}>Save Post</button>
                        <button type="button" onClick={this.clear}>Clear</button>
                    </div>
                </div>
                <div id="existing-posts">
                    {this.state.posts.map(function(post, i) {
                        return (
                            <div key={i} className="gw-box gw-box-shadow">
                                <div className="gw-row" dangerouslySetInnerHTML={this.createMarkup(post.message)}>
                                </div>
                                <div className="gw-row">
                                    <button type="button" onClick={this.editPost.bind(this, post)}>Edit Post</button><button type="button" onClick={this.deletePost.bind(this, post)}>Delete Post</button>
                                </div>
                            </div>
                        );
                    }, this)}
                </div>
            </div>
        );
    }
});

ReactDOM.render(
  <Posts />,
  document.getElementById('posts')
);