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
            query: {method:'GET', isArray:true}
        });
    })

   /** .factory('Student', function($resource){
        return $resource('/api/v1/student', {}, {
            query: {method:'GET', isArray:false}
        });
    });
*/