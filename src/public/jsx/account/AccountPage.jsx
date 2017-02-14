var AccountPage = React.createClass({
    displayName: 'AccountPage',
    
    getInitialState: function() {
        return {
            user: {
                businesses: []
            },
            formValid: false
        };
    },
    
    componentDidMount: function() {
        var me = this;
        
        fetch('/account/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
			return response.json();
		}).then(function(user) {
            console.log(user);
            me.setState({
                user: user
            });
        });
    },
    
//    onSubmit: function(e) {
//        e.preventDefault();
//        
//        var user = {
//            firstName: this.state.firstName,
//            lastName: this.state.lastName,
//            email: this.state.email,
//            username: this.state.username,
//            password: this.state.password
//        };
//        
//        fetch('/api/user/signup', {
//                method: 'POST',
//                headers: {
//                    'Accept': 'application/json',
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify(user)
//            }).then(function(response) {
//                if(response.status === 200) {
//                    console.log(response);
//                    console.log(response.msg);
//                } else {
//                    console.log(response);
//                    console.log(response.msg);
//                }
//            });
//    },
    
    updateAccountInfo: function(event) {
        event.preventDefault();
        
        var userInfo = {
            _id: this.state._id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        
        fetch('/account/' + userInfo._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(function(response) {
            console.log(response);
        });
    },
    
    updateFieldState: function(event) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        
        this.setState(newState);
    },
    
    updateUserFieldState: function(event) {
        var newUserState = this.state.user;
        newUserState[e.target.name] = e.target.value;
        
        this.setState({
            user: newUserState
        });
    },
    
    addBusiness: function() {
        fetch('/business', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    },
    
    render: function() {
        return (
            <div className="gw-column gw-padding">
                <form className="form" onSubmit={this.updateAccountInfo}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="firstName" value={this.state.user.firstName} onChange={this.updateUserFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={this.state.user.lastName} onChange={this.updateUserFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={this.state.user.email} onChange={this.updateUserFieldState}></input>
                        <span className="help-block">Please enter a valid email address.</span>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.user.username} onChange={this.updateUserFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.user.passwordAgain} onChange={this.updateUserFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Re-Enter Password</label>
                        <input type="password" className="form-control" name="passwordAgain" value={this.state.user.passwordAgain} onChange={this.updateUserFieldState}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Info</button>
                </form>
                <button className="btn btn-primary"><a href="/business">Add New Business</a></button>
                {this.state.user.businesses.map(function(business, i) {
                    return (
                        <div className="gw-row">
                            <a href={"/business/" + business._id}>{business.name}</a>
                        </div>
                    )
                })}
            </div>
        );
    }
});

ReactDOM.render(
    (
        <AccountPage />
    ),
    document.getElementById('account-page')
);