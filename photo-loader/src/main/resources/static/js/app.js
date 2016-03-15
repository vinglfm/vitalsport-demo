'use strict';

angular.module('demo', ['ui.router', 'ui.bootstrap'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url:'/',
                views: {
                    'content': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('app.albums', {
                url:'albums',
                views: {
                    'content@': {
                        templateUrl: 'views/albums.html',
                        controller: 'AlbumController'
                    }
                }
            })
            .state('app.album', {
                url:'album',
                views: {
                    'content@': {
                        templateUrl: 'views/album.html',
                        controller: 'ImageController'
                    }
                }
            })
            .state('app.albums.addAlbum', {
                 url: '/addAlbum',
                 onEnter: ['$state', '$uibModal',
                 function($state, $uibModal) {
                     $uibModal.open({
                         templateUrl: 'views/addAlbum.html',
                         size: 'lg',
                         controller: 'AddAlbumController'
                     }).result.finally(function() {
                        $state.go('app.albums');
                     });
                 }]
             })
             .state('app.album.addImage', {
                              url: '/addImage',
                              onEnter: ['$state', '$uibModal',
                              function($state, $uibModal) {
                                  $uibModal.open({
                                      templateUrl: 'views/addImage.html',
                                      size: 'lg',
                                      controller: 'AddImageController'
                                  }).result.finally(function() {
                                     $state.go('app.album');
                                  });
                              }]
                          });
        $urlRouterProvider.otherwise('/');
    })
     .run( [ 'sharingService', '$uibModalStack', '$rootScope', '$location',
     function(sharingService, $uibModalStack, $rootScope, $location) {
        $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            if(sharingService.userId === "" && toState.name !== 'app') {
                $location.path('/');
            }

            var top = $uibModalStack.getTop();
            if (top) {
                $uibModalStack.dismiss(top.key);
                event.preventDefault();
            }
        });
     }]);
