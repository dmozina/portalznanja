'use strict';

function VideoListCtrl($scope, $http) {
  $http.get('static/videos/videos.json').success(function(data) {
    $scope.videos = data;
  });

}

function IpriCtrl($scope, Team, Student) {
    $scope.teams = Team.query();
    $scope.students = Student.query();
}
