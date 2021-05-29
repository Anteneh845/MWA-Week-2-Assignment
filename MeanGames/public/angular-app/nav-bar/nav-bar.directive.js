angular
    .module("meanGames")
    .directive("navBar", navBar);

function navBar (){
    return {
        restrict:'E',
        templateUrl:"angular-app/nav-bar/nav-bar.html",
        scope:{

        }
    }
}