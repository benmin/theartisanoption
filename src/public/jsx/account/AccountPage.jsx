var AccountPage = React.createClass({
    displayName: 'AccountPage',
    
    getInitialState: function() {
        return {
            
        };
    },
    
    addBusiness: function() {
        fetch('/editor', {
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
                <button className="btn btn-primary" onClick={this.addBusiness}>Add New Business</button>
                {this.props.businesses.map(function(business, i) {
                    <div className="gw-row">
                        <a href={"/editor/" + business._id}>{business.name}</a>
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