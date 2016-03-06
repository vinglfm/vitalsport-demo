'use strict';

angular.module("demo", [])
    .controller("ImageController", ["$http", "$scope", "$element", "infoSharingService",
        function($http, $scope, $element, infoSharingService){

        var imageController = this;
        this.userId = "";
        this.album = "";

        var onSuccess = function(data) {
            console.log(data);
            infoSharingService.append(imageController.userId, imageController.album, $scope.files.name);
            infoSharingService.infos.forEach(function(info) {
                console.log(info);
            });

            imageController.userId = "";
            imageController.album = "";
            $scope.files = null;
            $('#upload\\.fileName', $element).val('');
        };

        this.upload = function() {
            var formData = new FormData();
            formData.append('file', $scope.files);

            $http.post("http://localhost:8081/vitalsport/photos/"+ this.userId + "/upload?album=" + this.album,
             formData, {
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            }).success(onSuccess);
        };
    }])

    .controller("PreviewController", ["$scope","imageService", "infoSharingService",
     function($scope, imageService, infoSharingService) {
        var thumbnails = [];

        this.download = function() {
            imageService.download(infoSharingService.infos, function(response) {
                console.log(response);
                thumbnails.push(response);
            });
        }

        this.getThumbnails = function() {
            return thumbnails;
        }
    }])

    .directive('fileInput', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('change', function() {
                $parse(attrs.fileInput)
                .assign(scope, elm[0].files[0]);
                scope.$apply();
            });
        }
    }
}]);