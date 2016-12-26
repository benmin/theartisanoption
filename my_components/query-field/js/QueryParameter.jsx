module.exports = React.createClass({
    displayName: 'QueryParameter',

<span className="qf-parameter btn btn-default btn-xs"
                    ng-repeat="parameter in parameters track by $index"
                    ng-class="{ 'qf-parameter-highlighted': parameter.highlighted }"
                    tabindex="0"
                    qf-focus="{{$index}}"
                    ng-focus="onFocus($index)"
                    ng-keydown="removeParameterOnBackspace($event,$index)">
                    <span className="close" ng-click="removeParameter($index)">&nbsp;x</span>
                    <span className="qf-option-type">{{parameter.label}}: </span>
                    <span className="qf-option-value">{{parameter.value}}</span>
                </span>