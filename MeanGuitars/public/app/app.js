angular.module("meanGuitars", ["ngRoute"]).config(appConfig);

function appConfig($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/guitar-list/guitar-list.html",
            controller: "GuitarListController",
            controllerAs: "guitarListCtrl"
        })
        .when("/guitars/new", {
            templateUrl: "app/add-guitar/add-guitar.html",
            controller: "AddGuitarController",
            controllerAs: "addGuitarCtrl"
        })
        .when("/login", {
            templateUrl: "app/login/login.html",
            controller: "LoginController",
            controllerAs: "loginCtrl"
        })
        .when("/register", {
            templateUrl: "app/register/register.html",
            controller: "RegisterController",
            controllerAs: "registerCtrl"
        })
        .when("/guitars/:guitarId", {
            templateUrl: "app/guitar-detail/guitar-detail.html",
            controller: "GuitarDetailController",
            controllerAs: "guitarDetailCtrl"
        })
        .otherwise({
            redirectTo: "/"
        })
}