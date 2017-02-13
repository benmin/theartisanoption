var AccountPage = React.createClass({
    displayName: 'AccountPage',
    
    getInitialState: function() {
        return {
            businesses: [],
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            passwordAgain: '',
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
            console.log(response);
            me.setState({
                firstName: response.firstName
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
                        <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.updateFieldState}></input>
                        <span className="help-block">Please enter a valid email address.</span>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.passwordAgain} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Re-Enter Password</label>
                        <input type="password" className="form-control" name="passwordAgain" value={this.state.passwordAgain} onChange={this.updateFieldState}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Info</button>
                </form>
                <button className="btn btn-primary"><a href="/business">Add New Business</a></button>
                {this.state.businesses.map(function(business, i) {
                    <div className="gw-row">
                        <a href={"/business/" + business._id}>{business.name}</a>
                    </div>
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