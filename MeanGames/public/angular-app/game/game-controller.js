angular.module("meanGames")
    .controller("GameDetailController", GameController);

function GameController($routeParams, GameDataFactory) {
    let vm = this;
    let gameId = $routeParams.gameId;
    GameDataFactory.getOneGame(gameId).then(resp => {
        vm.game = resp;
        let rating = [];
        for(let i=0;i<vm.game.rate;i++)
            rating.push(i);
        vm.rating = rating;
    });
}