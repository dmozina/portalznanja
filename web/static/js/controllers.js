'use strict';

function IpriCtrl($scope, Video) {
    $scope.videos = Video.query();
}

function VideoStreamCtrl($scope, VideoStream, Comments) {
    $scope.videoRel = VideoStream.query();
    $scope.comments = Comments.query();
}


