
'use strict';

angular.module('ipri', ['ipriServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/templates/featured.html',   controller: IpriCtrl})
            .otherwise({redirectTo: '/home'});
    }]);

angular.module('ipriStream', ['ipriServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/templates/videoStream.html',   controller: VideoStreamCtrl})
    }]);

angular.module('ipriSearch', ['ipriServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/templates/searchOptions.html',   controller: SearchCtrl})
    }]);

angular.module('ipriUpload', ['ipriServices']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/templates/upload.html',   controller: SearchCtrl})
    }]);