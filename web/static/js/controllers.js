'use strict';

function IpriCtrl($scope, Team, Student, Video) {
    $scope.videos = Video.query();
    $scope.teams = Team.query();
    $scope.students = Student.query();
}


