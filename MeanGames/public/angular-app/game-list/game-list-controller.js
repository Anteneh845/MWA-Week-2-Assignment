angular
    .module("meanGames")
    .controller("GameListController", GameListController);


function GameListController(GameDataFactory) {
    let vm = this;
    vm.title = "Mean Games APP";
    GameDataFactory.getAllGames().then(resp => vm.games = resp)
}