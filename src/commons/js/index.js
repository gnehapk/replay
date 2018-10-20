//# sourceURL=storage-management-plugin.js
(function() {

    var replayModule = angular.module("GoReplayModule", ["ui.router", "ui.bootstrap", "frapontillo.bootstrap-switch", "ui.bootstrap.modal"]);

    /* Setting up provider for getting config data */
    replayModule.provider("config", function() {

        /*Ideally this config should only contain
        configuration related stuff . it should not hold
        cluster data */
        var config = {};

        /* Accessible only in config function */
        this.setConfigData = function(dataFromServer) {
            config = dataFromServer;
        };

        /* Accessible in controller/service/factory */
        this.$get = function() {
            return config;
        };

    });


    /* First fetch the config data than only application will bootstrap */
    fetchConfigData()
        .then(bootstrapApplication);

    function fetchConfigData() {
        var initInjector = angular.injector(["ng"]);

        var $http = initInjector.get("$http");

        return $http.get("../../config.json").then(function(response) {

            replayModule.config(function($stateProvider, $urlRouterProvider, $httpProvider, configProvider) {

                configProvider.setConfigData(response.data);

                //$httpProvider.defaults.headers.post = {};
                //$httpProvider.defaults.headers.delete = {};

                $urlRouterProvider.otherwise("/landing-page");

                $stateProvider
                    // .state("login", {
                    //     url: "/login",
                    //     template: "<login></login>"
                    // })
                    .state("landing-page", {
                        url: "/landing-page",
                        template: "<landing-page></landing-page>"
                    });

            });

        }, function(errorResponse) {
            // Handle error case
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["GoReplayModule"]);
        });
    }

}());