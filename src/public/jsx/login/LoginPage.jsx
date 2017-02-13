var LoginPage = React.createClass({
    displayName: 'LoginPage',
    
    getInitialState: function() {
        return {
            username: '',
            password: ''
        };
    },
    
    updateFieldState: function(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        
        this.setState(newState);
    },
    
    onSubmit: function(e) {
        e.preventDefault();
        
        var credentials = {
            username: this.state.username,
            password: this.state.password
        };
        
        fetch('/api/user/login', {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(function(response) {
//            Response.redirect(response.url);
            console.log(response);
//            if(response.status === 200) {
//                console.log(response);
//                console.log(response.msg);
//            } else {
//                console.log(response);
//                console.log(response.msg);
//            }
        }).catch(function(err) {
            console.log(err);
        });
    },
    
    render: function() {
        return (
            <div className="gw-column gw-padding">
                <form className="form" action="/account/login" method="post">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="btn-toolbar">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    (
        <LoginPage />
    ),
    document.getElementById('login-page')
);