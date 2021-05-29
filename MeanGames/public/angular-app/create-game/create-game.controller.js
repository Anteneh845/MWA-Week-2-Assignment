angular
    .module("meanGames")
    .controller("CreateGameController", CreateGameController);

function CreateGameController(GameDataFactory) {
    let vm = this;
    vm.addGame = function () {
        if (vm.form.$valid) {
            let game = {
                title: vm.newGameTitle,
                price: vm.newGamePrice,
                rate: vm.newGameRating,
                year: vm.newGameYear,
                minPlayers: vm.newGameMinPlayers,
                maxPlayers: vm.newGameMaxPlayers,
                minAge: vm.newGameMinAge,
                designers: vm.newGameDesigner,
            }
            GameDataFactory.createNewGame(game).then(resp => console.log(resp));
        } else {
            console.log("For is not valid")
        }
    }

}