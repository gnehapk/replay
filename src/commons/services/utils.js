(function() {
    "use strict";

    angular
        .module("GoReplayModule")
        .service("utils", utils);

    /*@ngInject*/
    function utils($http, config) {

        /* Cache the reference to this pointer */
        var vm = this;
            
        vm.startGoReplay = function(configuration) {
            var url,
                actionRequest,
                request;

            //url = config.baseUrl + "start";
            url = "/api/started.json";

            actionRequest = {
                method: "GET",
                url: url,
                data: configuration
            };
            request = angular.copy(actionRequest);
            return $http(request).then(function(response) {
                return response.data;
            }).catch(function(e) {
                throw e;
            });
        };

        vm.stopGoReplay = function() {
            var url,
                actionRequest,
                request;

            //url = config.baseUrl + "stop";
            url = "/api/stopped.json";

            actionRequest = {
                method: "GET",
                url: url
            };
            request = angular.copy(actionRequest);
            return $http(request).then(function(response) {
                return response.data;
            }).catch(function(e) {
                throw e;
            });
        };
    };
})();