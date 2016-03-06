'use strict';

angular.module('demo')
    .constant('baseUrl', 'http://localhost:8081/vitalsport/photos/')
    .service('imageService', ['$http', 'baseUrl', function($http, baseUrl) {
        this.download = function(infos, callback, error) {

            infos.forEach(function(info){
//               console.log(info.userId + " " + info.album + " " + info.image);
               callback("http://localhost:8081/vitalsport/photos/"+ info.userId +
                "/image?album=" + info.album +"&image="+ info.image);
//               $http.get(baseUrl + info.userId + "/image",
//                {params:{"album": info.album, "image": info.image}})
//                .success(callback)
//                .error(error);
            });
        }
    }])
    .service('infoSharingService', function() {
        this.infos = [];

        this.append = function(userId, album, image) {
            this.infos.push({"userId" : userId, "album" : album, "image" : image});
        }
    });