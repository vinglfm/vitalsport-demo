'use strict';

angular.module("demo", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("app", {
                url:'/',
                views: {
                    "content": {
                        templateUrl: "views/login.html",
                        controller: "LoginController"
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    });
