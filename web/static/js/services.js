/**
 * Created with PyCharm.
 * User: David
 * Date: 26.4.2013
 * Time: 21:10
 * To change this template use File | Settings | File Templates.
 */

angular.module('ipriServices', ['ngResource'])
    .factory('Video', function($resource){
        return $resource('/api/v1/featured/?format=json', {}, {
            query: {method:'GET', isArray:false}
        });
    })

   .factory('VideoStream', function($resource, $location){
        return $resource('/api/v1/videoStream/' + $location.absUrl().split('=')[1] + '/?format=json', {}, {
            query: {method:'GET', isArray:false}
        });
    })

    .factory('Comments', function($resource, $location){
        return $resource('/api/v1/comments/?format=json' + '&video=' + $location.absUrl().split('=')[1] , {}, {
            query: {method:'GET', isArray:false}
        });
    })

    .factory('SearchLang', function($resource){
        return $resource('/api/v1/language/?format=json', {}, {
            query: {method:'GET', isArray:false}
        });
    })

    .factory('SearchCat', function($resource){
        return $resource('/api/v1/category/?format=json', {}, {
            query: {method:'GET', isArray:false}
        });
    });

