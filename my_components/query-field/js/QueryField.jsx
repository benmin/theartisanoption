module.exports = React.createClass({
    displayName: 'QueryField',
    
//    componentDidMount: function() {
//        this.retrievePosts();
//        console.log('Posts have been retrieved.');
//    },
    
    getInitialState: function() {
        return {
            parameters: []
        };
    },
    
    render: function() {
        return (
            <div className="form-control qf-form-control">
                
                
                value={this.state.userInfo.email} onChange={this.updateEmail}
                {this.state.posts.map(function(post, i) {
                        return <NewsItem key={i} date={post.date}>{post.message}</NewsItem>;
                    })}
                
                {this.state.parameters.map(function(parameter, i) {
                    return <QueryParameter />
                })}
                
                <input type="text"
                    placeholder="Enter search term..."
                    ng-model="inputValue"
                    tab-index="0"
                    uib-typeahead="option for option in options | filterOptions:parameters | filter:{value: $viewValue} | limitTo:8"
                    className="qf-input"
                    typeahead-template-url="query-field/html/QueryFieldOptionsTemplate.html"
                    typeahead-wait-ms="1"
                    typeahead-on-select="onSelect($item)"
                    qf-focus="-1"
                    ng-focus="onFocus(-1)"
                    ng-keydown="onBackspaceInput($event)" />
            </div>
        );
    }
});





app.directive('queryField', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'query-field/html/QueryFieldTemplate.html',
        scope: {
            options: '=',
            parameters: '='
        },
        controller: ['$scope', function($scope) {
        
            var KEYS = {
                BACKSPACE: 8,
                TAB: 9,
                SHIFT: 16
            };
          
            $scope.inputValue;
            
            $scope.selectedIndex;
          
            var freeFormIndexes = [];
            
            for(var i = 0; i < $scope.options.length; i++) {
                if($scope.options[i].freeform) {
                    freeFormIndexes.push(i);
                }
            }
            
            $scope.$watch(
                function(scope) {
                    return scope.inputValue;
                },
                function(newValue) {
                    for(var i = 0; i < freeFormIndexes.length; i++) {
                        $scope.options[freeFormIndexes[i]].value = newValue;
                    }
                }
            );
            
            $scope.onSelect = function($item) {
                $scope.parameters.push(angular.copy($item));
                
                // erase this only AFTER pushing the parameter, so dynamic options work
                $scope.inputValue = '';
            };
            
            $scope.onFocus = function(event, index) {
                
                if($scope.selectedIndex !== index) {
                    $scope.selectedIndex = index;
                }
            };
            
            $scope.removeParameterOnBackspace = function(event, index) {
                if(event.keyCode === KEYS.BACKSPACE) {
                    event.preventDefault();
                    
                    $scope.removeParameter(index);
                    
                    if(index === 0 && $scope.parameters.length > 0) {
                        $scope.selectedIndex = 0;
                    } else {
                        $scope.selectedIndex = index - 1;
                    }
                    
                // } else if(event.keyCode !== KEYS.TAB) {
                //     $scope.selectedIndex = -1;
                }
            };
            
            $scope.removeParameter = function(index) {
                $scope.parameters.splice(index,1);
            };
            
            $scope.onBackspaceInput = function(event) {
                if(event.keyCode === KEYS.BACKSPACE && !$scope.inputValue) {
                    var len = $scope.parameters.length;
                    
                    console.log(len, $scope.selectedIndex);
                    
                    if(len > 0) {
                        $scope.selectedIndex = len - 1;
                    }
                }
            };
        }]
    }
});




var KEYS = {
                BACKSPACE: 8,
                TAB: 9,
                SHIFT: 16
            };

var QueryParameter = React.createClass({

	getInitialState: function() {
  	return {
    	highlighted: false
    }
  },

	onFocus: function(index, event) {
  	
  },

	removeParameterOnBackspace: function(event) {
  	if(event.keyCode === KEYS.BACKSPACE) {
                    event.preventDefault();
                    
                    this.props.removeParameter();
                }
  },

  render: function() {
    return (
    	<span className={"qf-parameter btn btn-default btn-xs" + (this.state.highlighted ? 'qf-parameter-highlighted' : '')}
          tabIndex="0"
          
          onFocus={this.onFocus.bind(this,this.props.key)}
          onKeyDown={this.removeParameterOnBackspace}>
          <span className="close" onClick={this.props.removeParameter}>&nbsp;x</span>
          <span className="qf-option-type">{this.props.label}: </span>
          <span className="qf-option-value">{this.props.value}</span>
      </span>
    );
	}
});

var QueryField = React.createClass({

	getInitialState: function() {
  	return {
    	parameters: [{label: 'One', value: 'One Value'},{label: 'Two', value: 'Two Value'}]
    };
  },

	removeParameter: function(index) {
  	var params = this.state.parameters;
    params.splice(index,1);
    this.setState({
    	parameters: params
    });
  },

	render: function() {
  	return (
      <div className="form-control qf-form-control">
      {this.state.parameters.map(function(param, i) {
      	return <QueryParameter key={i} label={param.label} value={param.value} removeParameter={this.removeParameter.bind(this,i)}></QueryParameter>
      }, this)}
      
      <input type="text" placeholder="Enter search term..." ></input>
  </div>
    	
    );
  }
});

ReactDOM.render(
  <QueryField></QueryField>,
  document.getElementById('container')
);
