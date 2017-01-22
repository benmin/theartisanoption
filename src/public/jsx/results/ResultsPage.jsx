var Tabs = ReactBootstrap.Tabs,
    Tab = ReactBootstrap.Tab;

var tags: [{
    name: 'material',
    displayName: 'Material',
    options: ['Wood','Metal','Yarn']
},{
    name: 'product',
    displayName: 'Product',
    options: ['Jewelry','Furniture','Home Decor']
},{
    name: 'style',
    displayName: 'Style',
    options: ['Rustic','Modern','Classic']
}];

var localResults = [{
    name: 'Maille Knitter',
    description: {
        short: 'We craft beautiful, unique chainmaille jewelry.',
        long: 'We craft beautiful, unique chainmaille jewelry. This is a longer description because there is more space. And even more text because more space, etc, etc, etc.'
    },
    address: {
        city: 'Glen Burnie',
        state: 'MD'
    },
    rating: 4.4,
    email: 'mailleknitter@gmail.com',
    url: 'www.etsy.com/mailleknitter',
    phoneNumber: 4109695789,
    tags: {
        material: ['Metal'],
        product: ['Jewelry'],
        style: ['Modern']
    },
    photos: [{
        title: 'Photo 1'
    },{
        title: 'Photo 2'
    },{
        title: 'Photo 3'
    },{
        title: 'Photo 4'
    },{
        title: 'Photo 5'
    },{
        title: 'Photo 6'
    },{
        title: 'Photo 6'
    },{
        title: 'Photo 6'
    },{
        title: 'Photo 6'
    }]
},{
    name: 'Gnarled Oak Art',
    description: {
        short: 'We craft and sell beautiful wood items ranging from fine furniture to one of a kind works of art.',
        long: 'We craft and sell beautiful wood items ranging from fine furniture to one of a kind works of art. This is a longer description because there is more space. This is a longer description because there is more space. And even more text because more space, etc, etc, etc.'
    },
    address: {
        city: 'Denton',
        state: 'TX'
    },
    rating: 4.7,
    email: 'gnarledoakart@gmail.com',
    url: 'www.gnarledoakart.com',
    phoneNumber: 4104104100,
    tags: {
        material: ['Wood'],
        product: ['Home Decor','Furniture'],
        style: ['Rustic']
    },
    photos: [{
        title: 'Picture 1'
    },{
        title: 'Photo 2'
    },{
        title: 'Picture 3'
    },{
        title: 'Photo 4'
    },{
        title: 'Picture 5'
    },{
        title: 'Photo 6'
    }]
}];

var SearchSection = React.createClass({
    displayName: 'SearchSection',
    
    getInitialState: function() {
        return {
            
        }
    },
    
    render: function() {
        return (
            <div className="gw-column">
                <form className="form-inline">
                    <div className="form-group">
                        <label>Zipcode:</label>
                        <input type="text" className="form-control" name="zipcode"></input>
                    </div>
                    <div className="form-group">
                        <label>Distance:</label>
                        <input type="select" className="form-control" name="distance"></input>
                    </div>
                </form>
            </div>
        );
    }
});

var PhotoSection = React.createClass({
    displayName: 'PhotoSection',
    
    getInitialState: function() {
        return {
            
        }
    },
    
    render: function() {
        return (
            <div className="gw-row result-photos">
                {this.props.photos.map(function(photo, i) {
                    return (
                        <div key={i} style={{margin:5}}>
                            <img style={{height:150,width:200,borderWidth:2,marginBottom:5}} src={photo.src}></img>
                            <div>{photo.title}</div>
                        </div>
                    );
                }, this)}
            </div>
        );
    }
});

var ReviewSection = React.createClass({
    displayName: 'ReviewSection',
    
    getInitialState: function() {
        return {
            
        }
    },
    
    render: function() {
        return (
            <div>Reviews</div>
        );
    }
});

var Result = React.createClass({
    displayName: 'Result',
    
    getInitialState: function() {
        return {
            expanded: false,
            activeTab: '1'
        }
    },
    
    expandResult: function(event) {
        event.preventDefault();
        
        this.setState({
            expanded: true
        });
        
        
    },
    
    collapseResult: function(event) {
        
    },
    
    handleTabSelect: function(eventKey) {
        event.preventDefault();
        
        this.setState({
            activeTab: eventKey
        });
    },
    
    render: function() {
        return (
            <div className={'gw-box gw-box-shadow gw-column result' + (!this.state.expanded ? ' result-collapsed' : '')} onClick={this.props.clickHandler}>
                <div className="gw-row">
                    <div className="result-image">Image Here</div>
                    <div className="gw-column">
                        <div className="gw-row result-row">
                            <div className="result-name">{this.props.result.name}</div>
                            <div className="result-rating">{this.props.result.rating}/5 Stars</div>
                        </div>
                        <div className="gw-row">
                            <div className="gw-column gw-space-right">
                                {this.state.expanded ? (
                                    <div className="result-url result-row"><a href={this.props.result.url}>{this.props.result.url}</a></div>
                                ) : null}
                                {!this.state.expanded ? (
                                    <div className="result-description-short result-row">{this.props.result.description.short}</div>
                                ) : null}
                                <div className="result-location result-row">{this.props.result.address.city}, {this.props.result.address.state}</div>
                            </div>
                            {this.state.expanded ? (
                                <div className="gw-column">
                                    <div className="result-email result-row"><a href={'mailto:' + this.props.result.email}>{this.props.result.email}</a></div>
                                    <div className="result-phoneNumber result-row">{this.props.result.phoneNumber}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="result-description-long result-row" hidden={!this.state.expanded}>{this.props.result.description.long}</div>
                {this.state.expanded ? (
                    <div className="gw-column">
                        <Tabs defaultActiveKey={1}>
                            <Tab eventKey={1} title="Photos">
                                <PhotoSection photos={this.props.result.photos} />
                            </Tab>
                            <Tab eventKey={2} title="Reviews">
                                <ReviewSection reviews={this.props.result.reviews} />
                            </Tab>
                        </Tabs>
                    </div>
                ) : null}
                
            </div>
        );
    }
});

var ResultSection = React.createClass({
    displayName: 'ResultSection',
    
    resultDivs: [],
    expandedResult: null,
    
    getInitialState: function() {
        return {
            expandedResult: null
        }
    },
    
    onClickResult: function(i, e) {
        e.preventDefault();
        
        if(this.resultDivs[i] !== this.expandedResult) {
            if(this.expandedResult != null) {
                this.expandedResult.setState({
                    expanded: false
                });
            }
            
            this.expandedResult = this.resultDivs[i];
            
            this.expandedResult.setState({
                expanded: true
            });
        }
    },
    
    render: function() {
        return (
            <div>
                {this.props.results.map(function(result, i) {
                    return <Result
                               key={i}
                               result={result}
                               clickHandler={this.onClickResult.bind(this, i)}
                               ref={(result) => { this.resultDivs[i] = result; console.log(this, result, this.resultDivs, "IDENT") }} />
                }, this)}
            </div>
        );
    }
});

var ResultsPage = React.createClass({
    displayName: 'ResultsPage',
    
    getInitialState: function() {
        return {
            results: localResults
        };
    },
    
    search: function() {
        
    },
    
    render: function() {
        return (
            <div className="gw-column gw-padding">
                <SearchSection onSearch={this.search} />
                <ResultSection results={this.state.results} />
            </div>
        );
    }
});

ReactDOM.render(
    (
        <ResultsPage />
    ),
    document.getElementById('results-page')
);