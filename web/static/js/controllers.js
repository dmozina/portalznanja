'use strict';

function IpriCtrl($scope, Video) {
    $scope.videos = Video.query();
}

function VideoStreamCtrl($scope, VideoStream, Comments) {
    $scope.videoRel = VideoStream.query();
    $scope.comments = Comments.query();
}

function SearchCtrl($scope, SearchLang, SearchCat) {
    $scope.searchLang = SearchLang.query();
    $scope.searchCat = SearchCat.query();
}

function UserVideosCtrl($scope, UserVideos) {
    $scope.userVideos = UserVideos.query();
}

function UserCommentsCtrl($scope, UserComments) {
    $scope.userComments = UserComments.query();
}
