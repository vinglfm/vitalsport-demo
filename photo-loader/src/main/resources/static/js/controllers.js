
angular.module('demo')
    .controller('LoginController', ['sharingService', function(sharingService) {
        this.userId = "";
        this.save = function() {
            console.log(this.userId);
            sharingService.userId = this.userId;
        };
    }])
    .controller('AlbumController', ['$timeout', 'sharingService', 'albumService',
    function($timeout, sharingService, albumService) {
        var albums = [];

        this.download = function() {
            albumService.download(sharingService.userId, function(response){
                $timeout(function(){
                    albums = response;
                })
            }, function(response) {
                console.log(response);
            });
        }

        this.remove = function(userAlbum) {
            albumService.remove(sharingService.userId, userAlbum,
            function(response) {
                console.log(response);
                $timeout(function(){
                    albums = albums.filter(function(album) {
                        return album !== userAlbum;
                    });
                });
            });
        }

        this.getAlbums = function() {
            return albums;
        }

        this.save = function(userAlbum) {
            console.log(userAlbum);
            sharingService.album = userAlbum;
        };

        this.download();
    }])
    .controller('ImageController', ['$timeout', 'imageService', 'sharingService',
     function($timeout, imageService, sharingService) {
        var thumbnails = [];

        this.download = function() {
            imageService.download(sharingService.userId, sharingService.album,
             function(response) {
                $timeout(function(){
                    console.log(response);
                    thumbnails = response;
                });
            }, function(response) {
                console.log(response);
            });
        };

        this.remove = function(image) {
            imageService.remove(sharingService.userId, sharingService.album, image,
                function(response) {
                    $timeout(function() {
                      thumbnails = thumbnails.filter(function(thumbnail) {
                        return thumbnail.name !== image;
                      });
                    });
                });
        }

        this.getThumbnails = function() {
            return thumbnails;
        };

        this.download();
    }])
    .controller('AddAlbumController', ['addAlbumService', 'sharingService',
        function(addAlbumService, sharingService){

        var imageController = this;
        this.userId = sharingService.userId;
        this.album = "";

        this.upload = function() {
            addAlbumService.upload(this.userId, this.album,
            function(response) {
                imageController.album = "";
            }, function(response) {
                console.log(response);
            });
        };
    }])
    .controller('AddImageController', ['$scope', 'addImageService', 'sharingService',
            function($scope, addImageService, sharingService){

            var imageController = this;
            this.userId = sharingService.userId;
            this.album = sharingService.album;

            this.upload = function() {
                addImageService.upload(this.userId, this.album, $scope.files,
                function(response) {
                    $scope.files = null;
                }, function(response) {
                    console.log(response);
                });
            };
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