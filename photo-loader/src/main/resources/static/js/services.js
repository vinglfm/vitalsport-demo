"use strict";

angular.module("demo")
    .constant("baseUrl", "http://localhost:8081/vitalsport/photos/")
    .service("sharingService", function(){
        this.userId = "";
        this.album = "";
    })
    .service("albumService", ["$http", "baseUrl", function($http, baseUrl) {
        this.download = function(userId, onSuccess, onError) {
            var path = baseUrl + userId + "/albums";
            console.log(path);
            $http.get(path).success(onSuccess).error(onError);
        };

        this.remove = function(userId, album, onSuccess, onError) {
            $http.delete(baseUrl + userId + "/album",
            {params:{"album":album}}).then(onSuccess, onError);
        }
    }])
    .service("imageService", ["$http", "baseUrl", function($http, baseUrl) {
        this.download = function(userId, album, onSuccess, onError) {
           $http.get(baseUrl + userId + "/" + album)
            .success(function(response) {
                onSuccess(response.map(
                       function(elem) {
                           return {"name": elem,
                           "url": baseUrl + userId + "/image?album=" + album +"&image=" + elem};
                       }));
            })
            .error(onError);
        };

        this.remove = function(userId, album, image, onSuccess, onError) {
            var imageParams = {
                "album" : album,
                 "image" : image
                 };
            $http.delete(baseUrl + userId + "/image",
                        {params: imageParams})
                        .then(onSuccess, onError);
        }
    }])
    .service("addAlbumService", ["$http", "baseUrl", function($http, baseUrl) {
        this.upload = function(userId, album, onSuccess, onError) {
            $http.post(baseUrl + userId + "/album?album=" + album)
            .success(onSuccess)
            .error(onError);
        };
    }])
    .service("addImageService", ["$http", "baseUrl", function($http, baseUrl) {
        this.upload = function(userId, album, file, onSuccess, onError) {

            var formData = new FormData();
            formData.append('file', file);

            $http.post(baseUrl + userId + "/upload?album=" + album,
             formData, {
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            })
            .success(onSuccess)
            .error(onError);
        };
    }])
    .service("infoSharingService", function() {
        this.infos = [];

        this.append = function(userId, album, image) {
            this.infos.push({"userId" : userId, "album" : album, "image" : image});
        }
    });