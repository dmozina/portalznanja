'use strict';

function IpriCtrl($scope, Video) {
    $scope.videos = Video.query();
}

function VideoStreamCtrl($scope, VideoStream) {
    $scope.videoRel = VideoStream.query();
}


