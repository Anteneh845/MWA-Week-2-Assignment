angular
    .module("meanGames")
    .directive("gameRating", GameRating)

function GameRating() {
    return {
        restrict: "E", // A,EA
        templateUrl: "angular-app/game-rating-directive/game-rating.html",
        // bindToController: true,
        // controller: "GameDetailController",
        // controllerAs: "game",
        transclude:true,
        scope:{
            stars:"@", // =, @, &,
            rate: "@"
        }
    }
}