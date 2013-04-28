'use strict';

function IpriCtrl($scope, Video) {
    $scope.videos = Video.query();
}


