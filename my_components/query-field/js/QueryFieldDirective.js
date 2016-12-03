'use strict';

var app = angular.module('qfQueryField', ['ngSanitize', 'ngAnimate', 'ui.bootstrap']);

app.filter('qfQuery', function() {
  return function (items, queryParameters) {
    
    if(queryParameters.length === 0) {
      return items;
    }
    
    var filtered = [],
      i, j, param, item, match;
    
    for(i = 0; i < items.length; i++) {
      item = items[i];
      match = true;
      
      for(j = 0; j < queryParameters.length; j++) {
            param = queryParameters[j];
            
            if(param.type === undefined) {
                param.type = 'string';
            }
            
            switch(param.type) {
            case 'array':
                switch(param.comparison) {
                case 'equals':
                    if(item[param.field].indexOf(param.value.toLowerCase()) < 0) {
                        match = false;
                    }
                    break;
                default:
                    throw new Error('"' + param.comparison + '" is not support for type "' + param.type + '".');
                }
                break;
            case 'string':
                switch(param.comparison) {
                case 'equals':
                    if(item[param.field] !== param.value) {
                        match = false;
                    }
                    break;
                case 'contains':
                    if(!item[param.field].toLowerCase().includes(param.value.toLowerCase())) {
                        match = false;
                    }
                    break;
                default:
                    throw new Error('"' + param.comparison + '" is not support for type "' + param.type + '".');
                }
                break;
            default:
                throw new Error('Type "' + param.type + '" is not supported.');
            }
      }
      
      if(match) {
        filtered.push(item);
      }
    }
    
    return filtered;
  };
});

app.filter('filterOptions', function() {
    return function(options, queryParameters) {
      
    if(queryParameters.length === 0) {
      return options;
    }
    
    var filtered = [],
      i, j, param, option, match;
    
    for(i = 0; i < options.length; i++) {
      option = options[i];
      match = false;
      
      for(j = 0; j < queryParameters.length; j++) {
        param = queryParameters[j];
        
        if((option.label === param.label &&
            option.freeform &&
            !option.allowMultiple) ||
            (!option.freeform && option.value === param.value)) {
          match = true;
        }
      }
      
      if(!match) {
        filtered.push(option);
      }
    }
    
    return filtered;
  };
});

app.directive('qfFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            
            scope.$watch('selectedIndex', function(selectedIndex) {
                
                var index = attributes.qfFocus;
                
                if(selectedIndex == index) {
                    element[0].focus();
                }
            });
       }
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