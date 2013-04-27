'use strict';

function IpriCtrl($scope, Video, Student) {
    $scope.video = Video.query().video;
    $scope.students = Student.query();
}

