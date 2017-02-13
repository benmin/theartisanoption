var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var ClientApp = React.createClass({
	displayName: 'ClientApp',
    
    componentDidMount: function() {
        
        // init Facebook SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId: '969900873118466',
              xfbml      : true,
              version    : 'v2.7'
            });
            FB.AppEvents.logPageView();
          };
        (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "//connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
              console.log('FB is loaded.');
           }(document, 'script', 'facebook-jssdk'));
    },
	
	getInitialState: function() {
        return {
            userInfo: {
                email: '',
                isArtisan: false,
                name: '',
                product: '',
                location: '',
                website: ''
            }
        };
    },
    
    toggleArtisanInfo: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.isArtisan = event.target.checked;
        
        this.setState({
            userInfo: userInfo
        });
    },
	
	updateEmail: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.email = event.target.value;
        
		this.setState({
			userInfo: userInfo,
            dirtyEmail: true
		});
        
        this.validateEmail();
	},
    
    updateName: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.name = event.target.value;
        
		this.setState({
			userInfo: userInfo,
            dirtyName: true
		});
        
        this.validateName();
	},
    
    updateProduct: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.product = event.target.value;
        
		this.setState({
			userInfo: userInfo
		});
	},
    
    updateLocation: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.location = event.target.value;
        
		this.setState({
			userInfo: userInfo
		});
	},
    
    updateWebsite: function(event) {
        var userInfo = this.state.userInfo;
        userInfo.website = event.target.value;
        
		this.setState({
			userInfo: userInfo
		});
	},
    
	requestInvite: function() {
		var me = this,
            userInfo = me.state.userInfo;
        
        if(this.state.validName && this.state.dirtyName && this.state.validEmail && this.state.dirtyEmail) {
            fetch('/api/support', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            }).then(function(response) {
                if(response.status === 200) {
                    me.setState({
                        badSubmit: false,
                        submitted: true,
                        dirtyName: false,
                        dirtyEmail: false,
                        validEmail: false,
                        validName: false,
                        userInfo: {
                            email: '',
                            isArtisan: false,
                            name: '',
                            product: '',
                            location: '',
                            website: ''
                        }
                    });
                }
            });
        } else {
            me.setState({
                dirtyName: true,
                dirtyEmail: true,
                badSubmit: true
            });
        }
	},
    
    validateName: function() {
        this.setState({
            validName: this.state.userInfo.name.length > 0
        });
    },
    
    validateEmail: function() {
        this.setState({
            validEmail: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.userInfo.email)
        });
    },
    
    getNameClass: function() {
        var valid = this.state.validName,
            dirty = this.state.dirtyName;
        
        if(valid) {
            return ' has-success';
        } else if(!valid && dirty) {
            return ' has-error';
        } else {
            return '';
        }
    },
    
    getEmailClass: function() {
       var valid = this.state.validEmail,
           dirty = this.state.dirtyEmail;
        
        if(valid) {
            return ' has-success';
        } else if(!valid && dirty) {
            return ' has-error';
        } else {
            return '';
        }
    },
    
    hideModal(){
        this.setState({showModal: false})
    },
    
    showModal(){
        this.setState({showModal: true})
    },
    
	render: function() {
		return (
            <div id="main">
                <div id="menu-top-section" className="gw-row gw-center-h">
                    <ul className="gw-menu-inline">
                        <li className="gw-menu-item"><a href="">Home</a></li>
                        <li className="gw-menu-item"><a href="">Announcements</a></li>
                        <li className="gw-menu-item"><a href="">Blog</a></li>
                        <li className="gw-menu-item"><a href="account/login">Sign In</a></li>
                        <li className="gw-menu-item"><a href="account/signup">Sign Up</a></li>
                    </ul>
                </div>
                <div id="title-section" className="gw-row gw-center-h">
                    <div id="title-section-column" className="gw-column">
                        <div id="site-title" className="gw-row">The Artisan Option</div>
                        <div className="gw-row">
                            <div className="gw-column">
                                <div className="phrase phrase-one">Love what you do.</div>
                                <div className="phrase phrase-two">Love what you buy.</div>
                            </div>
                            <div className="gw-column">
                                <img id="logo" src="img/taologo4_nobg.png"></img>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div id="search-section">
                    <div id="site-description">Description of site.</div>
                    <div id="search"></div>
                    <div id="social-media"></div>
                </div>
                
                <div id="menu-bottom-section" className="gw-row gw-center-h">
                    <ul className="gw-menu-inline gw-sm">
                        <li className="gw-menu-item">About</li>
                        <li className="gw-menu-item">Terms of Service</li>
                    </ul>
                </div>
                
                <svg height="0" xmlns="http://www.w3.org/2000/svg">
                    <filter id="drop-shadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="2" dy="2" result="offsetblur"/>
                        <feFlood flood-color="#777"/>
                        <feComposite in2="offsetblur" operator="in"/>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </svg>
            
            
            {/*<div id="scrolling">
				<div id="main">
					<div id="main-foreground" className="gw-column">
                        <div id="modal-wrapper"></div>
						<div id="questions" className="gw-row gw-center-h">
                            <div>
                                <img id="header-img" src="img/header_1200_opt.png" />
                            </div>
                            <div id="header-small" className="box-black">
                                The Artisan Option
                            </div>
						</div>
                        <div id="teaser" className="gw-row gw-center-h common-font">
                            <div className="left gw-column box-black">
                                <div><strong>Love what you do.</strong></div>
                                <div>
                                    Let us connect you with local customers,<br />
                                    so you can focus on what you do best:<br />
                                    crafting quality products.
                                </div>
                            </div>
                            <div className="right gw-column box-black">
                                <div><strong>Love what you buy.</strong></div>
                                <div>Skip the mass-manufactured generic products.<br />
                                    Get what you really want from real people and<br />
                                    help small businesses prosper.
                                </div>
                            </div>
                        </div>
						<div id="interested" className="gw-column gw-center-h">
							<div id="interested-box" className="gw-column box-black">
								<div className="font-header-1">Interested?</div>
								<div className="common-font">This website is currently under development.<br />If you are interested in The Artisan Option, please sign up below for e-mailed updates.</div>
								<div id="email-row" className="gw-row gw-left-h">
                                    <form id="user-form" className="form">
                                        <div className={"form-group" + this.getNameClass()}>
                                            <label>Name</label>
                                            <input type="text" className="form-control" value={this.state.userInfo.name} onChange={this.updateName} />
                                            { !this.state.validName && this.state.dirtyName ?
                                                <span className="help-block">Please enter your name.</span>
                                            : null }
                                        </div>
                                        <div className={"form-group" + this.getEmailClass()}>
                                            <label>Email</label>
                                            <input type="email" className="form-control" value={this.state.userInfo.email} onChange={this.updateEmail} />
                                            { !this.state.validEmail && this.state.dirtyEmail ?
                                                <span className="help-block">Please enter a valid email address.</span>
                                            : null }
                                        </div>
                                        <div id="artisan" className="form-group">
                                            <label>
                                                <input id="artisan-checkbox" type="checkbox" onChange={this.toggleArtisanInfo} checked={this.state.userInfo.isArtisan} /> I am an artisan.
                                            </label>
                                            <a role="button" tabindex="0" onClick={this.showModal}>What is an artisan?</a>
                                            <Modal show={this.state.showModal} onHide={this.hideModal}>
                                              <Modal.Header closeButton>
                                                <Modal.Title>What is an artisan?</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                Artisans are those individuals who use their skills and creativity to make unique, high quality items. Artisans make a wide variety of items including food, furniture, jewelry, clothing, sculpture, painting, home d&#233;cor, leather items, and many other things, and they make each item in their own workshop.
                                              </Modal.Body>
                                              <Modal.Footer>
                                                <Button onClick={this.hideModal}>Close</Button>
                                              </Modal.Footer>
                                            </Modal>
                                        </div>
                                        { this.state.userInfo.isArtisan ?
                                            <div className="form-group">
                                                <label>What do you make?</label>
                                                <input type="text" className="form-control" value={this.state.userInfo.product} onChange={this.updateProduct} />
                                            </div>
                                        : null }
                                        { this.state.userInfo.isArtisan ?
                                            <div className="form-group">
                                                <label>Zipcode</label>
                                                <input type="text" className="form-control" value={this.state.userInfo.location} onChange={this.updateLocation} />
                                            </div>
                                        : null }
                                        { this.state.userInfo.isArtisan ?
                                            <div className="form-group">
                                                <label>Website URL</label>
                                                <input type="text" className="form-control" value={this.state.userInfo.website} onChange={this.updateWebsite} />
                                            </div>
                                        : null }
                                        { this.state.badSubmit ? 
                                            <div className="alert alert-danger" role="alert">Please enter your name and a valid email address.</div>
                                        : null }
                                        { this.state.submitted ?
                                            <div className="alert alert-success" role="alert"><strong>Thank you for your interest.</strong> You should receive an email from us shortly. Please add <a href="mailto:jonathan@theartisanoption.com">jonathan@theartisanoption.com</a> to your safe sender list to prevent our emails from going to your spam folder.</div>
                                        : null }
                                        <div className="form-group">
                                            <button type="button" className="btn btn-default" onClick={this.requestInvite}>Request Invite</button>
                                        </div>
                                    </form>
								</div>
                                
								<div id="facebook-buttons" className="gw-row gw-right-h">
									<div
								        className="fb-like"
                                        data-href="https://www.theartisanoption.com"
                                        data-share="true"
                                        data-action="like"
                                        data-layout="button_count"
                                        data-size="small"
                                        data-show-faces="false">
									</div>
								</div>
							</div>
						</div>
                        <div className="gw-row gw-center-h">
							<div id="response" className="common-font box-black">
								The vision of this company is to provide a commercially viable alternative to the manufacture and purchase of poor quality, generic, mass manufactured products. This site provides marketing support for people who want to earn a living selling items they create through their skills and passions. Those who wish to purchase these unique, high quality, independently created products can connect with these artisans, artists, and makers through The Artisan Option.
							</div>
						</div>
					</div>
				</div>
                <NewsFeed />
			</div>*/}
            </div>
		);
	}
});

ReactDOM.render(
  <ClientApp />,
  document.getElementById('app')
);