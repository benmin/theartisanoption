var EditorPage = React.createClass({
    displayName: 'EditorPage',
    
    getInitialState: function() {
        return {
            businessInfo: {
                address: {}
            },
            name: {
                isValid: function(value) {
                    return value.length > 0;
                }
            },
            shortDescription: {
                isValid: function(value) {
                    return value.length > 0;
                }
            },
            website: {
                isValid: function(value) {
                    return value.length > 0;
                }
            },
            email: {
                isValid: function(value) {
                    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
                }
            },
            phoneNumber: {
                isValid: function(value) {
                    return true;
                }
            }
        };
    },
    
    updateFieldState: function(e) {
        var stateUpdate = {
            businessInfo: this.state.businessInfo
        };
        
        var fieldName = e.target.name,
            value = e.target.value;
        
        stateUpdate.businessInfo[fieldName] = value;
        stateUpdate[fieldName] = this.state[fieldName];
        stateUpdate[fieldName].dirty = true;
        
        this.setState(stateUpdate);
        
        this.validateField(fieldName, value);
    },
    
    updateAddressFieldState: function(e) {
        var stateUpdate = {
            businessInfo: this.state.businessInfo
        };
        
        var fieldName = e.target.name,
            value = e.target.value;
        
        stateUpdate.businessInfo.address[fieldName] = value;
        stateUpdate[fieldName] = {};
        if(this.state[fieldName]) {
            stateUpdate[fieldName] = this.state[fieldName];
        }
        stateUpdate[fieldName].dirty = true;
        
        this.setState(stateUpdate);
        
        this.validateField(fieldName, value);
    },
    
    validateField: function(fieldName, value) {
        var stateUpdate = {};
        
        var fieldState = stateUpdate[fieldName] = this.state[fieldName];
        
        if(!fieldState) {
            fieldState = {};
        }
        
        if(fieldState.isValid) {
            fieldState.valid = fieldState.isValid(value);
        } else {
            fieldState.valid = true;
        }
        
        this.setState(stateUpdate);
    },
    
    getFieldClass: function(fieldName) {
       var valid = this.state[fieldName].valid,
           dirty = this.state[fieldName].dirty;
        
        if(valid) {
            return ' has-success';
        } else if(!valid && dirty) {
            return ' has-error';
        } else {
            return '';
        }
    },
    
    onSubmit: function(event) {
        event.preventDefault();
        
        var businessInfo = this.state.businessInfo;
        
        fetch('/business', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(businessInfo)
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
                <form className="form" onSubmit={this.onSubmit}>
                    <div className={"form-group" + this.getFieldClass('name')}>
                        <label>Business Name</label>
                        <input type="text" className="form-control" name="name" value={this.state.businessInfo.name} onChange={this.updateFieldState} />
                        { !this.state.name.valid && this.state.name.dirty ?
                            <span className="help-block">Please enter the name of your business.</span>
                        : null }
                    </div>
                    <div className={"form-group" + this.getFieldClass('shortDescription')}>
                        <label>Short Description</label>
                        <input type="text" className="form-control" name="shortDescription" value={this.state.businessInfo.shortDescription} onChange={this.updateFieldState} />
                        { !this.state.shortDescription.valid && this.state.shortDescription.dirty ?
                            <span className="help-block">Please a short description of your business.</span>
                        : null }
                    </div>
                    <div className="form-group">
                        <label>Long Description</label>
                        <input type="text" className="form-control" name="longDescription" value={this.state.businessInfo.longDescription} onChange={this.updateFieldState} />
                    </div>
                    <div className="form-group">
                        <label>Website URL</label>
                        <input type="text" className="form-control" name="website" value={this.state.businessInfo.website} onChange={this.updateFieldState} />
                    </div>
                    <div className={"form-group" + this.getFieldClass('email')}>
                        <label>Email Address</label>
                        <input type="text" className="form-control" name="email" value={this.state.businessInfo.email} onChange={this.updateFieldState} />
                        { !this.state.email.valid && this.state.email.dirty ?
                            <span className="help-block">Please enter a valid email address.</span>
                        : null }
                    </div>
                    <div className={"form-group" + this.getFieldClass('phoneNumber')}>
                        <label>Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={this.state.businessInfo.phoneNumber} onChange={this.updateFieldState} />
                        { !this.state.phoneNumber.valid && this.state.phoneNumber.dirty ?
                            <span className="help-block">Please enter a valid phone number.</span>
                        : null }
                    </div>
                    <div className="form-group">
                        <label>Street Address</label>
                        <input type="text" className="form-control" name="streetAddress" value={this.state.businessInfo.address.streetAddress} onChange={this.updateAddressFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" name="city" value={this.state.businessInfo.address.city} onChange={this.updateAddressFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" name="state" value={this.state.businessInfo.address.state} onChange={this.updateAddressFieldState}></input>
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" name="zipcode" value={this.state.businessInfo.address.zipcode} onChange={this.updateAddressFieldState}></input>
                    </div>
                    
                    <div className="btn-toolbar">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button className="btn btn-default">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    (
        <EditorPage />
    ),
    document.getElementById('editor-page')
);