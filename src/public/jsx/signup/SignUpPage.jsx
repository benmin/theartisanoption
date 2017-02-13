var SignUpPage = React.createClass({
    displayName: 'SignUpPage',
    
    getInitialState: function() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            passwordAgain: '',
            agreeToTerms: false,
            formValid: false
        };
    },
    
    showTermsOfService: function(e) {
        e.preventDefault();
    },
    
    onSubmit: function(e) {
        e.preventDefault();
        
        var user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        
        fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    console.log(response.msg);
                } else {
                    console.log(response);
                    console.log(response.msg);
                }
            });
    },
    
    updateFieldState: function(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        
        this.setState(newState);
    },
    
    render: function() {
        return (
            <div className="gw-column gw-padding">
                <form className="form" action="/account/signup" method="post">
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
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Re-Enter Password</label>
                        <input type="password" className="form-control" name="passwordAgain" value={this.state.passwordAgain} onChange={this.updateFieldState}></input>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="agreeToTerms" value={this.state.agreeToTerms} onChange={this.updateFieldState}></input>
                            I agree to the <a href="terms-of-service" onClick={this.showTermsOfService}>Terms of Service</a>.
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.formValid}>Sign Up</button>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    (
        <SignUpPage />
    ),
    document.getElementById('sign-up-page')
);