"use strict";

angular.module("demo", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("app", {
                url:"/",
                views: {
                    "content": {
                        templateUrl: "views/login.html",
                        controller: "LoginController"
                    }
                }
            })
            .state("app.albums", {
                url:"albums",
                views: {
                    "content@": {
                        templateUrl: "views/albums.html",
                        controller: "AlbumController"
                    }
                }
            })
            .state("app.album", {
                url:"album",
                views: {
                    "content@": {
                        templateUrl: "views/album.html",
                        controller: "ImageController"
                    }
                }
            })

        $urlRouterProvider.otherwise("/");
    });
