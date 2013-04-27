
'use strict';

angular.module('ipri', ['ipriServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/templates/index.html',   controller: IpriCtrl})
            .when('/details', {templateUrl: '/static/students/templates/details.html',   controller: IpriCtrl})
            .otherwise({redirectTo: '/'});
    }]);