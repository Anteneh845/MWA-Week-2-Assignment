angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/", {
            templateUrl: "./angular-app/welcome/welcome.html",
        })
        .when("/games", {
            templateUrl: "./angular-app/game-list/game-list.html",
            controller: "GameListController",
            controllerAs: "gameCtrl"
        })
        .when("/login", {
            templateUrl: "./angular-app/login/login.html",
            controller: "LoginController",
            controllerAs: "loginCtrl"
        })
        .when("/register",{
            templateUrl:"./angular-app/register/register.html",
            controller:"RegisterController",
            controllerAs: "registerCtrl"
        })
        .when("/games/new", {
            templateUrl: "/angular-app/create-game/create-game.html",
            controller: "CreateGameController",
            controllerAs: "createGameCtrl"
        })
        .when("/games/:gameId", {
            templateUrl: "./angular-app/game/game.html",
            controller: "GameDetailController",
            controllerAs: "gameDetailCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
}