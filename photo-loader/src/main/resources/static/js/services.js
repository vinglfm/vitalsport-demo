"use strict";

angular.module("demo")
    .constant("baseUrl", "http://localhost:8081/vitalsport/photos/")
    .service("sharingService", function(){
        this.userId = "";
        this.album = "";
    })
    .service("albumService", ["$http", "baseUrl", function($http, baseUrl) {
        this.download = function(userId, onSuccess, onError) {
            $http.get(baseUrl + userId + "/albums").success(onSuccess).error(onError);
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
    .service("infoSharingService", function() {
        this.infos = [];

        this.append = function(userId, album, image) {
            this.infos.push({"userId" : userId, "album" : album, "image" : image});
        }
    });